<template>
    <div class="home">
        <div v-if="error" class="error">Could not fetch the data</div>
        <div v-if="playlists">
            <ListView :playlists="playlists"></ListView>
        </div>
    </div>
</template>

<script>
import ListView from '@/components/ListView.vue';
import getPlaylists from '@/composables/getPlaylists';

export default {
    name: "Home",
    components: { ListView },
    setup() {
        const { error, playlists } = getPlaylists();
        return { error, playlists };
    }
}
</script>
