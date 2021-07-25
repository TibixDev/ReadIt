<template>
    <h1 v-if="!TextData" class="text-4xl animate-bounce font-semibold pt-5">Loading...</h1>
    <div v-if="TextData" class="textArea w-full sm:w-1/2 mx-auto py-5">
        <div v-if="IsRaw">
            <p class="text-xl py-1 font-semibold" v-for="paragraph, paragraphIndex of TextData.split('\n')" 
                :key="paragraphIndex"
                :class="paragraphIndex === 0 ? 'text-3xl py-3 underline' : ''"
            >{{ paragraph }}</p>
        </div>
        <div class="text-xl" v-else>
            <div v-html="TextData"></div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import sanitizeHtml from 'sanitize-html';
export default {

    name: "Reader",
    data: function() {
        return {
            TextData: null
        }
    },
    created() {
        if (this.$store.state.ReadLink != "") {
            axios.get("https://cors.bridged.cc/" + this.$store.state.ReadLink)
            .then((response) => {
                // handle success
                this.TextData = sanitizeHtml(response.data, {
                    allowedTags: ['article', 'p', 'span', 'b', 'strong', 'i', 'em', 'mark', 'small', 'del', 
                    'ins', 'sub', 'sup', 'a', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'hr',
                    'br', 'pre', 'div', 'img', 'ul', 'ol', 'li']
                });
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