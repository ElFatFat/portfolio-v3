import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Spotify from '@/components/windows/Spotify.vue'
import ChromeApp from '@/components/windows/ChromeApp.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/spotify',
      name: 'Spotify',
      component: Spotify
    },
    {
      path: '/SAE 501',
      name: 'SAE 501',
      component: ChromeApp
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
