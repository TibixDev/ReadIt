<template>
    <Header/>
    <div class="container mx-auto text-primary px-3 appcontent">
        <router-view/>
    </div>
</template>

<script>
import Header from "@/components/Header.vue";
import ThemeMixin from "@/mixins/ThemeMixin.js";

export default {
    name: "App",
    components: { Header },
    mixins: [ThemeMixin],
    created() {
        if (localStorage.getItem("theme")) {
            this.SetTheme(localStorage.getItem("theme"));
        }
    }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
@import "assets/themes.scss";

html {
    background-color: #2c3e50;
}

#app {
    font-family: 'Poppins', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

.appcontent {
    padding-top: 5rem;
}

.text-primary {
    @apply text-gray-50;
}

.bg-primary {
    @apply bg-yellow-500;
}

.color-primary {
    @apply text-yellow-500 #{!important};
}

.border-primary {
    @apply border-yellow-500;
}

.window-content {
    @apply bg-gray-600;
}

.loading-bar {
    @apply bg-primary;
    @apply border-primary;
}

</style>
