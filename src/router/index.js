import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Reader from '@/views/Reader.vue'
import Settings from '@/views/Settings.vue'
import store from '@/store/index.js';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/reader/',
    name: 'Reader',
    component: Reader,
    beforeEnter: (to, from, next) => {
      if (!store.state.ReadLink && !store.state.HistoryID) next({ name: 'Home' })
      else next()
    }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
