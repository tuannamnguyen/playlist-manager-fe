<template>
    <div class="home">
        <div v-if="error" class="error">{{ error }}</div>
        <div v-else-if="isPending">Loading...</div>
        <div v-else-if="playlists.length">
            <ListView :playlists="playlists" />
        </div>
        <div v-else>No playlists found.</div>
    </div>
</template>

<script>
import ListView from '@/components/ListView.vue';
import getPlaylists from '@/composables/getAllPlaylists';
import { onMounted, ref } from 'vue';

export default {
    name: "Home",
    components: { ListView },
    setup() {
        const error = ref(null);
        const isPending = ref(true);
        const playlists = ref([]);

        onMounted(async () => {
            try {
                const result = await getPlaylists();
                playlists.value = result.playlists.value || [];
                error.value = result.error.value;
                console.log('Playlists in Home:', playlists.value); // Add this for debugging
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
