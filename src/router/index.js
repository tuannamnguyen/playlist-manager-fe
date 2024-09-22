import { createRouter, createWebHistory } from 'vue-router';
import { authGuard } from "@auth0/auth0-vue";
import Home from '@/views/Home.vue'
import PlaylistDetails from '@/views/playlists/PlaylistDetails.vue';
import CreatePlaylist from '@/views/playlists/CreatePlaylist.vue';
import UserPlaylists from '@/views/playlists/UserPlaylists.vue';
import CallbackPage from '@/views/auth/CallbackPage.vue';


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
      props: true,
      beforeEnter: authGuard,
    },
    {
      path: "/playlists/create",
      name: "CreatePlaylist",
      component: CreatePlaylist,
      beforeEnter: authGuard,
    },
    {
      path: "/playlists/user",
      name: "UserPlaylists",
      component: UserPlaylists,
      beforeEnter: authGuard,
    },
    {
      path: "/callback",
      name: "Callback",
      component: CallbackPage
    }
  ]
})

export default router
