<template>
    <Header/>
    <div class="container mx-auto mt-5 text-primary px-3">
        <router-view/>
    </div>
</template>

<script>
import Header from "./components/Header.vue";
import ThemeMixin from "./mixins/ThemeMixin.js";

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

.text-primary {
    @apply text-gray-50;
}

.bg-primary {
    @apply bg-yellow-500;
}

.color-primary {
    @apply text-yellow-500 #{!important};
}

.theme-cobalt {
    background-color: #2a2a2a;
    .bg-primary {
        @apply bg-blue-500;
    }
    .text-primary {
        @apply text-gray-50;
    }
    .color-primary {
        @apply text-blue-500 #{!important};
    }
}

.theme-sakura {
    background-color: #ffffff;
    .bg-primary {
        background-color: #dc79a4
    }
    .text-primary {
        color: #000000;
    }
    .color-primary {
        color: #dc79a4!important;
    }
    header {
        color: #ffffff!important;
    }
    button {
        color: #ffffff;
    }
    .logWindow {
        color: #ffffff;
        background-color: #dc79a4;
    }
    .erricon {
        background-color: #dc79a4;
        @apply rounded-full;
    }
}
</style>
