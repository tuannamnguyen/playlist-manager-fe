<template>
    <form @submit.prevent="handleSubmit">
        <h4>Create New Playlist</h4>
        <input type="text" required placeholder="Playlist title" v-model="title" />
        <textarea required placeholder="Playlist description..." v-model="description"></textarea>

        <button v-if="!isPending">Create</button>
        <button v-else disabled>Saving...</button>

        <p v-if="error" class="error">{{ error }}</p>
        <p v-if="success" class="success">Playlist created successfully!</p>
    </form>
</template>

<script>
import { ref } from 'vue';
import createPlaylist from '@/composables/createPlaylist';
import { useAuth0 } from "@auth0/auth0-vue";

export default {
    setup() {
        const { user } = useAuth0();
        const title = ref('');
        const description = ref('');
        const error = ref(null);
        const isPending = ref(false);
        const success = ref(false);

        const handleSubmit = async () => {
            error.value = null;
            success.value = false;

            if (!title.value.trim()) {
                error.value = "Playlist title is required";
                return;
            }
            const userId = user.value.sub;

            const { error: apiError, isPending: apiIsPending, newPlaylist } = await createPlaylist(title.value, userId);

            isPending.value = apiIsPending.value;

            if (apiError.value) {
                error.value = apiError.value;
            } else if (newPlaylist.value) {
                success.value = true;
                title.value = '';
                description.value = '';
                console.log('New playlist created:', newPlaylist.value);
                // You might want to emit an event here to notify the parent component
                // this.$emit('playlist-created', newPlaylist.value);
            }
        };

        return {
            title,
            description,
            error,
            isPending,
            success,
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

.success {
    color: green;
}
</style>
