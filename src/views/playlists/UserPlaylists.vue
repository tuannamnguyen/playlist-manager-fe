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
import getPlaylists from '@/composables/getAllPlaylists';
import { useAuth0 } from '@auth0/auth0-vue';

export default {
    components: { ListView },
    setup() {
        const { user } = useAuth0();

        // TODO: update this
        const { error, playlists } = getPlaylists();
        return { error, playlists };
    }
}
</script>
