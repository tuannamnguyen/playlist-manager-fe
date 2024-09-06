import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import PlaylistDetails from '@/views/playlists/PlaylistDetails.vue'
import CreatePlaylist from '@/views/playlists/CreatePlaylist.vue'
import UserPlaylists from '@/views/playlists/UserPlaylists.vue'

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
    },
    {
      path: "/playlists/create",
      name: "CreatePlaylist",
      component: CreatePlaylist
    },
    {
      path: "/playlists/user",
      name: "UserPlaylists",
      component: UserPlaylists
    }
  ]
})

export default router
