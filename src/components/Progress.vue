<template>
    <div class="relative pt-1 px-2">
        <div class="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
        <div :style="{ width: value + '%' }" class="shadow-none flex flex-col whitespace-nowrap text-white justify-center bg-green-500"></div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Progress",
    props: ["value"]
}
</script>

<style>

</style>