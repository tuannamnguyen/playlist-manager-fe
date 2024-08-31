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
import ListView from '@/components/ListView.vue';
import getCollection from '@/composables/getCollection';

export default {
    components: { ListView },
    setup() {
        const { error, playlists } = getCollection();
        return { playlists };
    }

};
</script>
