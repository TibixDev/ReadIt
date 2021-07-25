<template>
    <h1 v-if="!TextData" class="text-4xl animate-bounce font-semibold pt-5">Loading...</h1>
    <div v-if="TextData" class="w-full sm:w-1/2 mx-auto py-5 text-xl" @change="FinalizeQS">
        <div v-if="IsRaw" class="textArea">
            <p class="text-xl py-1 font-semibold" v-for="paragraph, paragraphIndex of TextData.split('\n')" 
                :key="paragraphIndex"
                :class="paragraphIndex === 0 ? 'text-3xl py-3 underline' : ''"
            >{{ paragraph }}</p>
        </div>
        <div v-else class="textArea">
            <div v-html="TextData"></div>
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
        ...mapState(["ReadLink", "IsRaw", "QuerySelector"])
    },
    methods: {
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
                // handle success
                this.TextData = sanitizeHtml(response.data, {
                    allowedTags: ['article', 'p', 'span', 'b', 'strong', 'i', 'em', 'mark', 'small', 'del', 
                    'ins', 'sub', 'sup', 'a', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'hr',
                    'br', 'pre', 'div', 'img', 'ul', 'ol', 'li'],
                    allowedAttributes: {
                        '*': ['class', 'id', 'href']
                    }
                });

                // good practices 101 (please, do not ever do this)
                // TODO: change this
                setTimeout(() => {
                    if (!this.IsRaw && this.QuerySelector) { 
                        console.log(document.querySelector(".textArea"))
                        this.TextData = document.querySelector('.textArea').querySelector(this.QuerySelector).innerHTML;
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
    @apply py-1 text-blue-400 underline
}
</style>