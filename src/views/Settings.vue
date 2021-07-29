<template>
  <h1 class="text-5xl underline pb-10">Settings</h1>
  <div class="text-2xl">
      <h2 class="pb-5">Themes</h2>
      <div class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 auto-cols-max mx-auto justify-center gap-4">
        <Theme name="Default" themeclass="" :colors="['#F59E0B', '#F9FAFB', '#2c3e50', '#F9FAFB']"></Theme>
        <Theme name="Cobalt" themeclass="theme-cobalt" :colors="['#2a2a2a', '#F9FAFB', '#3B82F6', '#3B82F6']"></Theme>
        <Theme name="Sakura" themeclass="theme-sakura" :colors="['#ffffff', '#dc79a4', '#000000', '#dc79a4']"></Theme>
      </div>

  </div>
</template>

<script>
import Theme from '../components/Theme.vue';

export default {
    name: "Settings",
    components: {Theme}
}
</script>

<style>

</style>