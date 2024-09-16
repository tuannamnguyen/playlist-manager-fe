<template>
    <div class="add-song">
        <button v-if="!showForm" @click="showForm = true">Add Songs</button>
        <form v-if="showForm" @submit.prevent="handleSubmit">
            <h4>Add a New Song</h4>
            <input type="text" placeholder="Song title" required v-model="title">
            <input type="text" placeholder="Artists (comma-separated)" required v-model="artistsInput">
            <input type="text" placeholder="Album" required v-model="album">
            <button :disabled="isPending">{{ isPending ? 'Adding...' : 'Add' }}</button>
        </form>
        <p v-if="error" class="error">{{ error }}</p>
    </div>
</template>

<script>
import { ref } from 'vue';
import addSongsToPlaylist from '@/composables/addSongsToPlaylist';

export default {
    props: ["playlist"],
    emits: ['song-added'],
    setup(props, { emit }) {
        const title = ref("");
        const artistsInput = ref("");
        const album = ref("");
        const showForm = ref(false);
        const error = ref(null);
        const isPending = ref(false);

        const handleSubmit = async () => {
            isPending.value = true;
            error.value = null;

            const artists = artistsInput.value.split(',').map(artist => artist.trim());

            const song = {
                song_name: title.value,
                artist_names: artists,
                album_name: album.value
            };

            try {
                const { error: addError, updatedPlaylist } = await addSongsToPlaylist(props.playlist.playlist_id, [song]);

                if (addError.value) {
                    throw new Error(addError.value);
                }

                console.log('Song added successfully:', updatedPlaylist.value);
                emit('song-added', updatedPlaylist.value);

                // Reset form
                title.value = "";
                artistsInput.value = "";
                album.value = "";
                showForm.value = false;
            } catch (e) {
                error.value = e.message || "Failed to add song to playlist";
                console.error('Error adding song to playlist:', e);
            } finally {
                isPending.value = false;
            }
        };

        return { title, artistsInput, album, showForm, handleSubmit, error, isPending }
    }
}
</script>

<style scoped>
.add-song {
    text-align: center;
    margin-top: 40px;
}

form {
    max-width: 100%;
    text-align: left;
}

.error {
    color: red;
    margin-top: 10px;
}
</style>
