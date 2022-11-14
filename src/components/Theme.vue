<template>
    <div class="theme rounded-xl bg-primary px-2 py-5 cursor-pointer hover:opacity-90" @click="SetTheme(themeclass)">
        <div class="flex gap-2 flex-row justify-center">
            <div :style="'background-color:' + colors[0]" class="h-8 w-8 rounded-full border-2"></div>
            <div :style="'background-color:' + colors[1]" class="h-8 w-8 rounded-full border-2"></div>
            <div :style="'background-color:' + colors[2]" class="h-8 w-8 rounded-full border-2"></div>
            <div :style="'background-color:' + colors[3]" class="h-8 w-8 rounded-full border-2"></div>
        </div>
        <p class="pt-2">{{name}}</p>
    </div>
</template>

<script>
import ThemeMixin from "../mixins/ThemeMixin.js"

export default {
    name: "Theme",
    props: ["colors", "name", "themeclass"],
    mixins: [ThemeMixin]
}
</script>

<style>

</style>