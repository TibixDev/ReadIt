<template>
      <header class="bg-primary mx-auto py-3 font-semibold text-primary text-2xl align-middle flex sm:flex-row space-y-3 sm:space-y-0 flex-col">
        <div class="flex justify-between items-center px-3">
            <router-link to="/" class="flex-initial">
                <h1 class="text-3xl mr-3 pr-5 sm:border-r-2 border-gray-50">ReadIt</h1>
            </router-link>
            <button @click="MenuToggled = !MenuToggled" class="sm:hidden flex-none rounded-xl p-2">
                <img src="img/menu.svg" alt="Menu Icon" class="fill-current w-6 h-6">
            </button>
        </div>
        <div :class="MenuToggled ? '' : 'hidden'" class="text-center flex flex-auto flex-col items-center sm:flex-row sm:flex sm:space-x-5 space-y-0 sm:space-y-0">
            <router-link to="/settings" class="hover:text-gray-300 sm:py-0 py-2">Settings</router-link>
            <router-link to="/about" class="hover:text-gray-300 sm:py-0 py-2">About</router-link>
        </div>
    </header>
</template>

<script>
export default {
    name: "Header",
    data: function () {
        return {
            MenuToggled: false
        }
    }
}
</script>

<style>

</style>