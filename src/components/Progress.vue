<template>
    <div class="relative pt-1 px-2">
        <div class="overflow-hidden h-2 mb-4 text-xs flex rounded border-2">
        <div :style="{ width: value + '%' }" class="shadow-none flex flex-col whitespace-nowrap text-white justify-center" :class="colorclass"></div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Progress",
    props: ["value", "colorclass"]
}
</script>

<style>

</style>