<template>
    <Header/>
    <div class="container mx-auto mt-5 text-white px-3">
        <router-view/>
    </div>
</template>

<script>
import Header from "./components/Header.vue";

export default {
    name: "App",
    components: { Header }
}
</script>

<style>
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
</style>
