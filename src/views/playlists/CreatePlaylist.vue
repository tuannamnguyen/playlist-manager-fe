<template>
    <form @submit.prevent="handleSubmit">
        <h4>Create New Playlist</h4>
        <input type="text" required placeholder="Playlist title" v-model="title" />
        <textarea required placeholder="Playlist description..." v-model="description"></textarea>

        <button v-if="!isPending">Create</button>
        <button v-else disabled>Saving...</button>

        <p v-if="error" class="error">{{ error }}</p>
    </form>
</template>

<script>
import { ref } from 'vue';
import { useAuth0 } from '@auth0/auth0-vue';
import { useRouter } from 'vue-router';
import createPlaylist from '@/composables/createPlaylist';

export default {
    setup() {
        const { user } = useAuth0();
        const router = useRouter();

        const title = ref('');
        const description = ref('');
        const error = ref(null);
        const isPending = ref(false);

        const handleSubmit = async () => {
            error.value = null;

            if (!title.value.trim()) {
                error.value = "Playlist title is required";
                return;
            }

            if (!user.value) {
                error.value = "User not authenticated";
                return;
            }

            isPending.value = true;

            try {
                const { error: apiError, newPlaylist } = await createPlaylist(title.value, user.value.sub);

                if (apiError.value) {
                    error.value = apiError.value;
                } else if (newPlaylist.value) {
                    console.log('New playlist created:', newPlaylist.value);
                    // Redirect to the home page
                    router.push('/');
                }
            } catch (err) {
                console.error('Error creating playlist:', err);
                error.value = 'An unexpected error occurred';
            } finally {
                isPending.value = false;
            }
        };

        return {
            title,
            description,
            error,
            isPending,
            handleSubmit
        };
    }
};
</script>

<style scoped>
form {
    background: white;
}

input[type="file"] {
    border: 0;
    padding: 0;
}

label {
    font-size: 12px;
    display: block;
    margin-top: 30px;
}

.error {
    color: red;
}
</style>
