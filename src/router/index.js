import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import PlaylistDetails from '@/views/playlists/PlaylistDetails.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: "/playlists/:id",
      name: "PlaylistDetails",
      component: PlaylistDetails,
      props: true
    }
  ]
})

export default router
