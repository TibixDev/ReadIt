<template>
    <h1 class="text-3xl py-10">Enter a URL to get started.</h1>
    <div class="flex flex-row justify-center px-3 pb-5">
        <input :value="ReadLink" @input="UpdateReadLink" class="w-full sm:w-auto text-gray-500 text-xl p-4 rounded-l-xl" placeholder="https://read.me/text.txt" type="text" name="textlink" id="textlink">
        <button
            :disabled="!IsValidLink"
            class="rounded-r-xl text-xl px-3"
            :class="!IsValidLink ? 'bg-gray-600 cursor-not-allowed' : 'bg-primary'"
            @click="this.$router.push('/reader/')"
        >
        Read It
        </button>
    </div>
    <div class="inline-flex flex-col gap-5 justify-center text-left text-lg p-5 rounded-md">
        <h1 class="text-3xl font-bold pb-2 border-b-2 border-primary w-full text-center">Options</h1>
        <div>
            <input class="p-4 rounded-lg color-primary" type="checkbox" id="isRaw" :checked="IsRaw" @click="$store.commit('ChangeRaw')">
            <label for="isRaw" class="font-semibold px-2">Is raw text</label>
        </div>
        <input @input="UpdateQuerySelector" v-if="!IsRaw" class="text-lg font-mono p-3 rounded-xl color-primary" type="text" name="qs" id="qs" :value="QuerySelector" placeholder="Query Selector (Optional)">
        <div v-if="!IsRaw">
            <input class="p-4 rounded-lg color-primary" type="checkbox" id="selectMultiple" :checked="SelectMultiple" @click="$store.commit('UpdateSelectMultiple')">
            <label for="selectMultiple" class="font-semibold px-2">Select all instances</label>
        </div>
        <div v-if="!IsRaw">
            <input class="p-4 rounded-lg color-primary" type="checkbox" id="useSeparator" :checked="QuerySelectorSeparator" @click="$store.commit('UpdateQuerySelectorSeparator')">
            <label for="useSeparator" class="font-semibold px-2">Use separator between matches</label>
        </div>
        <div v-if="!IsRaw">
            <input class="p-4 rounded-lg color-primary" type="checkbox" id="useAutomaticSpacing" :checked="AutomaticSpacing" @click="$store.commit('UpdateAutomaticSpacing')">
            <label for="useAutomaticSpacing" class="font-semibold px-2">Use automatic spacing</label>
        </div>
    </div>
    <p class="text-3xl my-8 pt-8 border-t-2 border-primary ">Or continue where you left off</p>
    <History/>
</template>

<script>
import { mapState } from 'vuex'
import History from "@/components/History.vue";

export default {
    name: 'Home',
    components: { History },
    computed: {
        ...mapState(["ReadLink", "IsRaw", "AutomaticSpacing", "QuerySelector", "SelectMultiple", "QuerySelectorSeparator"]),
        IsValidLink: function () {
            return this.ReadLink.match(/[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/ig);
        }
    },
    methods: {
        //...mapMutations(["UpdateReadLink"])
        UpdateReadLink: function (e) { this.$store.commit('UpdateReadLink', e.target.value) },
        UpdateQuerySelector: function (e) { this.$store.commit('UpdateQuerySelector', e.target.value) }
    }
}
</script>
