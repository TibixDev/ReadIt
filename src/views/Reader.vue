<template>
    <h1 v-if="!TextData" class="text-4xl animate-bounce font-semibold pt-5">Loading...</h1>
    <div v-if="TextData" class="w-full sm:w-2/3 md:w-1/2 mx-auto py-5 text-xl" @change="FinalizeQS">
        <div v-if="IsRaw" class="textArea flex flex-col gap-4">
            <p class="text-xl" v-for="paragraph, paragraphIndex of TextData.split('\n').filter(line => line.length > 1)" 
                :key="paragraphIndex"
                :class="paragraphIndex === 0 ? 'text-3xl py-3 underline' : ''"
            >{{ paragraph }}</p>
        </div>
        <div v-else class="textArea">
            <div class="flex flex-col gap-4" v-html="TextData"></div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import sanitizeHtml from 'sanitize-html';
import { mapState } from 'vuex';

export default {

    name: "Reader",
    data: function() {
        return {
            TextData: null
        }
    },
    computed: {
        ...mapState(["ReadLink", "IsRaw", "QuerySelector", "SelectMultiple", "QuerySelectorSeparator"])
    },
    methods: {
        // Deprecated until I find a better method
        FinalizeQS() {
            if (!this.IsRaw && this.QuerySelector) { 
                console.log(document.querySelector(".textArea"))
                this.TextData = document.querySelector('.textArea').querySelector(this.QuerySelector).innerHTML;
            }
        }
    },
    created() {
        if (this.ReadLink) {
            axios.get("https://cors.bridged.cc/" + this.ReadLink)
            .then((response) => {
                // Handle success
                this.TextData = sanitizeHtml(response.data, {
                    allowedTags: ['article', 'p', 'span', 'b', 'strong', 'i', 'em', 'mark', 'small', 'del', 
                    'ins', 'sub', 'sup', 'a', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'hr',
                    'br', 'pre', 'div', 'img', 'ul', 'ol', 'li'],
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

                // Query Selector Finalizer
                // good practices 101 (please, do not ever do this)
                // TODO: change this
                setTimeout(() => {
                    if (!this.IsRaw && this.QuerySelector) { 
                        //console.log(document.querySelector(".textArea"));
                        if (this.SelectMultiple) {
                            console.log("QSS: " + this.QuerySelectorSeparator);
                            console.log("QSAllMatches: " + document.querySelector('.textArea').querySelectorAll(this.QuerySelector).length + " DOM Objects");
                            this.TextData = [...document.querySelector('.textArea').querySelectorAll(this.QuerySelector)].map(e => this.QuerySelectorSeparator ? e.innerHTML + "<div class='w-full h-1 bg-yellow-500 my-8'></div>" : e.innerHTML).join("\n");
                        } else {
                            this.TextData = document.querySelector('.textArea').querySelector(this.QuerySelector).innerHTML;
                        }
                        console.log("QSHelper: Processed everything.")
                    }
                }, 250);

            })
            .catch((error) => {
                // handle error
                console.log(error);
            })
        }
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

.textArea img {
    @apply rounded-lg mx-auto;
}

.textArea pre {
    white-space: pre-wrap;
    @apply bg-gray-800 my-5 p-5 rounded-lg text-left font-mono border-l-8 border-blue-500
}
</style>