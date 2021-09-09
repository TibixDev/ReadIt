<template>
    <h1 v-if="!TextData && !ErrorFlag" class="text-4xl animate-bounce pt-5">Loading...</h1>
    <div v-if="ErrorFlag">
        <img src="/img/alert-circle.svg" alt="Error Icon" class="erricon mx-auto h-48 w-48">
        <div class="errorWindow pt-3 pb-10 flex flex-col gap-3 sm:gap-1">
            <h1 class="text-3xl">An error occured while trying to read this document.</h1>
            <p class="text-xl">There could be many reasons for the error. An invalid URL, invalid query selector, and many others.</p>
            <p class="text-xl">If you believe this is a mistake please open a GitHub issue <a href="https://github.com/TibixDev/readit/issues">here</a>.</p>
        </div>
        <div class="logWindow p-2 bg-gray-700 w-auto sm:w-2/3 mx-auto rounded-xl border-l-4 border-primary">
            <p class="text-4xl font-semibold py-2">Log</p>
            <p v-for="LogEntry, LogIdx of Logs" :key="LogIdx" class="text-2xl font-mono pt-5 px-2">{{LogEntry}}</p>
        </div>
    </div>
    <div v-if="TextData && !ErrorFlag" class="w-full sm:w-2/3 md:w-1/2 mx-auto py-5 text-xl">
        <div v-if="IsRaw" class="textArea flex flex-col gap-4">
            <p class="text-xl" v-for="paragraph, paragraphIndex of TextData.split('\n').filter(line => line.length > 1)" 
                :key="paragraphIndex"
                :class="paragraphIndex === 0 ? 'text-3xl py-3 underline' : ''"
            >{{ paragraph }}</p>
        </div>
        <div v-else class="textArea">
            <h1 v-if="TextTitle" class="my-3 underline">{{TextTitle}}</h1>
            <div :class="AutomaticSpacing ? 'flex flex-col gap-4' : ''" v-html="TextData"></div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import sanitizeHtml from 'sanitize-html';
import { mapState, mapMutations, mapGetters } from 'vuex';

export default {

    name: "Reader",
    data: function() {
        return {
            TextData: null,
            TextTitle: null,
            Logs: [],
            ErrorFlag: false,
            LocalHistoryID: this.HistoryID,
            HistoryHasTitle: false,
            ScrollUpdateInterval: null
        }
    },
    computed: {
        ...mapState(["ReadLink", "IsRaw", "AutomaticSpacing", "QuerySelector", "SelectMultiple", "QuerySelectorSeparator", "HistoryID"]),
        ...mapGetters(['GetHistoryEntryByID, GetHistoryEntryByURL'])
    },
    methods: {
        ...mapMutations(["NewHistoryEntry", "UpdateHistoryEntry", "SetPropsFromHistory", "UnsetHistoryID"]),
        Process() {
            if (this.ReadLink) {
                axios.get("https://cors.bridged.cc/" + this.ReadLink)
                .then((response) => {
                    // Handle success
                    this.TextData = sanitizeHtml(response.data, {
                        allowedTags: ['article', 'p', 'span', 'b', 'strong', 'i', 'em', 'mark', 'small', 'del', 
                        'ins', 'sub', 'sup', 'a', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'hr',
                        'br', 'pre', 'div', 'img', 'ul', 'ol', 'li', 'title'],
                        allowedAttributes: {
                            '*': ['class', 'id'],
                            a: [ 'href', 'name', 'target' ],
                            img: [ 'src', 'width', 'height', 'alt' ]
                        }
                    });
    
                    // Image fixer
                    // Get domain from url
                    let domain = this.ReadLink.split("/")[2];
                    
                    // Replace all links with the domain
                    this.TextData = this.TextData.replace(/src="(?!http)/g, `src="https://${domain}`);
                    this.TextData = this.TextData.replace(/href="(?!http)/g, `href="https://${domain}`);
    
                    // Query Selector & Title Finalizer
                    // good practices 101 (please, do not ever do this)
                    // TODO: change this
                    setTimeout(() => {
                        if (!this.IsRaw) {
                            // Match title tag with regex magic
                            this.TextTitle = this.TextData.match(/<title>(.*?)<\/title>/i)[1];
                            if (!this.HistoryHasTitle) {
                                this.UpdateHistoryEntry({id: this.LocalHistoryID, prop: "title", value: this.TextTitle});
                            }
                            console.log(`Updated title (${this.TextTitle})`);
                        } else {
                            if (!this.HistoryHasTitle) {
                                this.UpdateHistoryEntry({id: this.LocalHistoryID, prop: "title", value: this.TextData.split('\n')[0]});
                            }
                        }
                        if (!this.IsRaw && this.QuerySelector) {
                            try {
                                if (this.SelectMultiple) {
                                    console.log("QSS: " + this.QuerySelectorSeparator);
                                    this.Logs.push("QSS: " + this.QuerySelectorSeparator);
                                    console.log("QSAllMatches: " + document.querySelector('.textArea').querySelectorAll(this.QuerySelector).length + " DOM Objects");
                                    this.Logs.push("QSAllMatches: " + document.querySelector('.textArea').querySelectorAll(this.QuerySelector).length + " DOM Objects");
                                    this.TextData = [...document.querySelector('.textArea').querySelectorAll(this.QuerySelector)].map(e => this.QuerySelectorSeparator ? e.innerHTML + "<div class='w-full h-1 bg-primary my-8'></div>" : e.innerHTML).join("\n");
                                } else {
                                    this.TextData = document.querySelector('.textArea').querySelector(this.QuerySelector).innerHTML;
                                }
                                this.Logs.push("QSHelper: Processed everything.")
                                console.log("QSHelper: Processed everything.")
                            } catch (e) {
                                this.ErrorFlag = true;
                                this.Logs.push(e);
                            }
                        }

                        console.log("Setting scroll percentage...")
                        // For some reason this simply refused to work with mapGetters \_o_/
                        this.SetScrollPercent(this.$store.getters.GetHistoryEntryByID(this.LocalHistoryID).progress || 0);


                        // Update history entry with scroll position every 10 seconds
                        console.log("Setting interval for ScrollUpdate...")
                        this.ScrollUpdateInterval = setInterval(() => {
                            this.UpdateHistoryEntry({id: this.LocalHistoryID, prop: "progress", value: this.GetScrollPercent()});
                        }, 5000);
                    }, 250);
    
                })
                .catch((error) => {
                    this.ErrorFlag = true;
                    this.Logs.push("Error: " + error.message);
                    console.log(error);
                })
            }
        },

        // Helper
        GetScrollPercent() {
            let h = document.documentElement, 
                b = document.body,
                st = 'scrollTop',
                sh = 'scrollHeight';
            return (h[st]||b[st]) / ((h[sh]||b[sh]) - h.clientHeight) * 100;
        },
        SetScrollPercent(percent) {
            if (percent > 0) {
                let h = document.documentElement, 
                    b = document.body,
                    st = 'scrollTop',
                    sh = 'scrollHeight';
                let scrollpos = Math.floor(h[sh] * (percent / 100)) - h.clientHeight;
                console.log(`Scrolling to ${percent}% -> ${scrollpos} / ${h[sh]} px`);
                window.scrollTo(0, scrollpos);
            }
        }
    },
    created() {
        if (this.HistoryID) {
            this.SetPropsFromHistory(this.HistoryID);
            this.LocalHistoryID = this.HistoryID;
            this.UnsetHistoryID();
            this.HistoryHasTitle = true;
        } else {
            console.log(typeof this.NewHistoryEntry)
            this.LocalHistoryID = '_' + Math.random().toString(36).substr(2, 9);
            this.NewHistoryEntry(this.LocalHistoryID);
        }
        this.Process();
    },
    beforeRouteLeave (to, from, next) {
        if (this.ScrollUpdateInterval) {
            clearInterval(this.ScrollUpdateInterval);
            console.log(`Cleared ScrollUpdateInterval for ID ${this.LocalHistoryID}`);
        }
        next();
    }
}
</script>

<style>
.textArea h1 {
    @apply text-3xl py-3 font-semibold;
}

.textArea p {
    @apply py-1;
}

.textArea a {
    @apply py-1 text-blue-400 underline;
}

.errorWindow a {
    @apply py-1 text-blue-400 underline;
}

.textArea img {
    @apply py-2 rounded-lg mx-auto;
}

.textArea pre {
    white-space: pre-wrap;
    @apply bg-gray-800 my-5 p-5 rounded-lg text-left font-mono border-l-8;
}
</style>