<template>
    <div class="user-playlists">
        <h2>My playlists</h2>
        <div v-if="playlists">
            <ListView :playlists="playlists" />
        </div>
        <router-link to="/playlists/create" class="btn">Create a playlist</router-link>
    </div>

</template>

<script>
import ListView from '@/components/ListView.vue';
import getPlaylists from '@/composables/getPlaylists';
export default {
    components: { ListView },
    setup() {
        const { error, playlists } = getPlaylists();
        return { error, playlists };
    }
}
</script>
