import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import Reader from "@/views/Reader.vue";
import Settings from "@/views/Settings.vue";
import About from "@/views/About.vue";
import store from "@/store/index.js";

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
        meta: {
            title: "ReadIt -  Home",
        },
    },
    {
        path: "/reader/",
        name: "Reader",
        component: Reader,
        meta: {
            title: "ReadIt -  Reader",
        },
        beforeEnter: (to, from, next) => {
            if (!store.state.ReadLink && !store.state.HistoryID) next({ name: "Home" });
            else next();
        },
    },
    {
        path: "/about",
        name: "About",
        component: About,
        meta: {
            title: "ReadIt -  About",
        },
    },
    {
        path: "/settings",
        name: "Settings",
        component: Settings,
        meta: {
            title: "ReadIt -  Settings",
        },
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

router.beforeEach((to, _, next) => {
    document.title = to.meta.title || "ReadIt";
    next();
});

export default router;
