<template>
    <div class="user-playlists">
        <h2>My playlists</h2>
        <div v-if="playlists">
            <ListView :playlists="playlists" />
        </div>
        <router-link :to="{name: 'CreatePlaylist'}" class="btn">Create a playlist</router-link>
    </div>
</template>

<script>
import getCollection from "../../composables/getCollection";
import getUser from "@/composables/getUser";
import ListView from "@/components/ListView.vue";

export default {
    components: { ListView },
    setup() {
        const { user } = getUser();
        const { documents: playlists } = getCollection("playlist", [
            "userId",
            "==",
            user.value.uid,
        ]);
        return { playlists };
    },
};
</script>

<style>
</style>