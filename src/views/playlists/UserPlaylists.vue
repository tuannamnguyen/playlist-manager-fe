<template>
    <div class="user-playlists">
        <h2>My playlists</h2>
        <div v-if="isPending">Loading...</div>
        <div v-else-if="error">{{ error }}</div>
        <div v-else-if="playlists">
            <ListView :playlists="playlists" />
        </div>
        <router-link to="/playlists/create" class="btn">Create a playlist</router-link>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import ListView from '@/components/ListView.vue';
import getAllPlaylists from '@/composables/getAllPlaylists';
import { useAuth0 } from '@auth0/auth0-vue';

export default {
    components: { ListView },
    setup() {
        const { user } = useAuth0();
        const error = ref(null);
        const isPending = ref(true);
        const playlists = ref([]);

        onMounted(async () => {
            if (user.value) {
                const result = await getAllPlaylists(user.value.sub);
                error.value = result.error.value;
                isPending.value = result.isPending.value;
                playlists.value = result.playlists.value;
            }
        });

        return { error, isPending, playlists };
    }
}
</script>
