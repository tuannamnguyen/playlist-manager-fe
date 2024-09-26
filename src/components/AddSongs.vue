<template>
    <div class="add-song">
        <button v-if="!showForm" @click="showForm = true">Add Songs</button>
        <form v-if="showForm" @submit.prevent="handleSearch">
            <h4>Search for a Song</h4>
            <input type="text" placeholder="Song title" required v-model="searchQuery">
            <input type="text" placeholder="Artist" required v-model="searchArtist">
            <button :disabled="isSearching">{{ isSearching ? 'Searching...' : 'Search' }}</button>
        </form>
        <div v-if="searchResult" class="search-result">
            <h4>Search Result:</h4>
            <p>Title: {{ searchResult.song_name }}</p>
            <p>Artists: {{ searchResult.artist_names.join(', ') }}</p>
            <p>Album: {{ searchResult.album_name }}</p>
            <button @click="handleAddSong" :disabled="isPending">
                {{ isPending ? 'Adding...' : 'Add to Playlist' }}
            </button>
        </div>
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
        const searchQuery = ref("");
        const searchArtist = ref("");
        const showForm = ref(false);
        const error = ref(null);
        const isPending = ref(false);
        const isSearching = ref(false);
        const searchResult = ref(null);

        const handleSearch = async () => {
            isSearching.value = true;
            error.value = null;

            try {
                const response = await fetch('http://localhost:8080/api/search', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        track: searchQuery.value,
                        artist: searchArtist.value
                    }),
                });

                if (!response.ok) {
                    throw new Error('Search failed');
                }

                searchResult.value = await response.json();
            } catch (e) {
                error.value = "Failed to search for song";
                console.error('Error searching for song:', e);
            } finally {
                isSearching.value = false;
            }
        };

        const handleAddSong = async () => {
            if (!searchResult.value) return;

            isPending.value = true;
            error.value = null;

            const song = {
                song_name: searchResult.value.song_name,
                artist_names: searchResult.value.artist_names,
                album_name: searchResult.value.album_name
            };

            try {
                const { error: addError, updatedPlaylist } = await addSongsToPlaylist(props.playlist.playlist_id, [song]);

                if (addError.value) {
                    throw new Error(addError.value);
                }

                console.log('Song added successfully:', updatedPlaylist.value);
                emit('song-added', updatedPlaylist.value);

                // Reset form and search result
                searchQuery.value = "";
                searchArtist.value = "";
                searchResult.value = null;
                showForm.value = false;
            } catch (e) {
                error.value = e.message || "Failed to add song to playlist";
                console.error('Error adding song to playlist:', e);
            } finally {
                isPending.value = false;
            }
        };

        return {
            searchQuery,
            searchArtist,
            showForm,
            handleSearch,
            handleAddSong,
            error,
            isPending,
            isSearching,
            searchResult
        }
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

.search-result {
    margin-top: 20px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
}
</style>
