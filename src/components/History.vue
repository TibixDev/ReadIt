<template>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <div
            v-for="entry, HistoryIndex of History.sort((a, b) => b.date - a.date)" :key="HistoryIndex"
            class="flex flex-col m-2 text-xl bg-primary rounded-xl text-center"
        >
            <div>
                <div class="flex flex-row w-full justify-between items-center bg-blue-600 px-2 rounded-t-xl">
                    <p class="py-1">{{ HumanizeAgo(entry.date) }} ago</p>
                    <button class="h-4 w-4 bg-red-500 rounded-full" @click="DeleteHistoryEntry(entry.id)"></button>
                </div>
            </div>
            <div class="flex flex-col justify-between cursor-pointer" @click="ActivateEntry(entry.id)">
                <p class="p-2 line-clamp-3">{{ entry.title }}</p>
                <Progress :value="entry.progress"/>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import Progress from "@/components/Progress.vue";
import humanizeDuration from 'humanize-duration'

export default {
    name: "History",
    components: { Progress },
    methods: {
        ...mapMutations(["SetHistoryID", "DeleteHistoryEntry"]),
        ActivateEntry(id) {
            this.SetHistoryID(id);
            this.$router.push("/reader");
        },
        HumanizeAgo(date) {
            return humanizeDuration(date - Date.now(), { largest: 2, round: true });
        }
    },
    computed: {
        ...mapState(["History"])
    }
}
</script>

<style>
</style>