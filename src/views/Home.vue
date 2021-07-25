<template>
    <h1 class="text-5xl py-10">Enter a URL to get started.</h1>
    <div class="flex flex-row justify-center px-3 pb-5">
        <input :value="ReadLink" @input="UpdateReadLink" class="w-full sm:w-auto text-gray-500 text-xl p-4 rounded-l-full" placeholder="https://read.me/text.txt" type="text" name="textlink" id="textlink">
        <button
            class="bg-yellow-500 rounded-r-full text-xl font-semibold px-3"
            @click="this.$router.push('/reader/')"
        >
        Read It
        </button>
    </div>
    <div class="flex flex-col gap-5 justify-center items-center px-2">
        <div>
            <input class="p-4 rounded-lg text-yellow-500" type="checkbox" name="isRaw" id="isRaw" :checked="IsRaw" @click="$store.commit('ChangeRaw')">
            <label for="isRaw" class="text-xl font-sembold px-2">Is raw text</label>
        </div>
        <input @input="UpdateQuerySelector" v-if="!IsRaw" class="text-lg font-mono p-4 rounded-full w-full sm:w-1/5 text-yellow-500" type="text" name="qs" id="qs" placeholder="Query Selector (Optional)">
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'


export default {
    name: 'Home',
    computed: {
        ...mapState(["ReadLink", "IsRaw", "QuerySelector"])
    },
    methods: {
        //...mapMutations(["UpdateReadLink"])
        UpdateReadLink: function (e) { this.$store.commit('UpdateReadLink', e.target.value) },
        UpdateQuerySelector: function (e) { this.$store.commit('UpdateQuerySelector', e.target.value) }
    }
}
</script>
