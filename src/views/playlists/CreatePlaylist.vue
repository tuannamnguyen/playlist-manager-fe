<template>
    <form @submit.prevent="handleSubmit">
        <h4>Create New Playlist</h4>
        <input type="text" required placeholder="Playlist title" v-model="title" />
        <textarea required placeholder="Playlist description..." v-model="description"></textarea>
        <label>Upload playlist cover image</label>
        <input type="file" @change="handleChange" />
        <div class="error">{{ fileError }}</div>
        <button v-if="!isPending">Create</button>
        <button v-else disabled>Saving...</button>
    </form>
</template>

<script>
import usePlaylist from "@/composables/usePlaylist";
import { ref } from "vue";
import { useRouter } from 'vue-router';

export default {
    setup() {
        const { error, isPending, createPlaylist } = usePlaylist();
        const router = useRouter();

        const title = ref("");
        const description = ref("");
        const file = ref(null);
        const fileError = ref(null);

        const handleSubmit = async () => {
            if (file.value) {
                const formData = new FormData();
                formData.append('playlist_name', title.value);
                formData.append('description', description.value);
                formData.append('cover_image', file.value);
                formData.append('user_id', '1'); // Replace with actual user ID

                const newPlaylist = await createPlaylist(formData);
                if (newPlaylist && !error.value) {
                    router.push({ name: 'PlaylistDetails', params: { id: newPlaylist.id } });
                }
            }
        };

        const handleChange = (e) => {
            const selected = e.target.files[0];
            const types = ["image/png", "image/jpeg", "image/jpg"];

            if (selected && types.includes(selected.type)) {
                file.value = selected;
                fileError.value = null;
            } else {
                file.value = null;
                fileError.value = "Please select an image file (png or jpg)";
            }
        };

        return { title, description, handleSubmit, handleChange, fileError, isPending, error };
    },
};
</script>

<style>
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

button {
    margin-top: 20px;
}
</style>
