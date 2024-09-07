<template>
    <div class="home">
        <div v-if="error" class="error">Could not fetch the data</div>
        <div v-if="playlists">
            <ListView :playlists="playlists"></ListView>
        </div>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import ListView from '@/components/ListView.vue';
import getPlaylists from '@/composables/getPlaylists';

export default {
    name: "Home",
    components: { ListView },
    setup() {
        const error = ref(null);
        const isPending = ref(true);
        const playlists = ref(null);

        onMounted(async () => {
            try {
                const result = await getPlaylists();
                playlists.value = result.playlists;
                error.value = result.error;
            } catch (e) {
                error.value = "An unexpected error occurred";
                console.error(e);
            } finally {
                isPending.value = false;
            }
        });

        return { error, isPending, playlists };
    }
}
</script>
