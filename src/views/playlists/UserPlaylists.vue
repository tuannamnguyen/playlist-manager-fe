<template>
    <div class="user-playlists">
        <h2>My playlists</h2>
        <div v-if="playlists">
            <ListView :playlists="playlists" />
        </div>
        <router-link :to="{ name: 'CreatePlaylist' }" class="btn">Create a playlist</router-link>
    </div>
</template>

<script>
import { onMounted } from "vue";
import usePlaylist from "@/composables/usePlaylist";
import ListView from "@/components/ListView.vue";

export default {
    components: { ListView },
    setup() {
        const { error, playlists, fetchPlaylists } = usePlaylist();

        onMounted(fetchPlaylists);

        return { playlists, error };
    },
};
</script>

<style>
</style>