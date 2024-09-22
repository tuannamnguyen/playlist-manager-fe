<template>
    <div v-if="error" class="error">{{ error }}</div>
    <div v-if="playlist" class="playlist-details">
        <div class="playlist-info">
            <div class="cover">
                <img :src="'https://picsum.photos/200/300'" :alt="playlist.playlist_name" />
            </div>
            <h2>{{ playlist.playlist_name }}</h2>
            <p>Created by {{ playlist.user_name }}</p>
            <p class="description">Lorem ipsum</p>
            <button v-if="ownership" @click="handleConvertPlaylist(playlist.playlist_id, 'spotify')"
                :disabled="isConverting">
                {{ isConverting ? 'Converting...' : 'Convert playlist to Spotify' }}
            </button>
            <br><br>
            <button v-if="ownership" @click="handleDeletePlaylist" :disabled="isDeleting">
                {{ isDeleting ? 'Deleting...' : 'Delete Playlist' }}
            </button>
        </div>

        <div class="song-list">
            <div v-if="!songs.length">
                No songs have been added to this playlist yet
            </div>
            <div v-for="(song, index) in songs" :key="index" class="single-song">
                <div class="details">
                    <h3>{{ song.song_name }}</h3>
                    <p>{{ song.artist_names.join(', ') }}</p>
                    <p>{{ song.album_name }}</p>
                </div>
                <button @click="() => handleDeleteSong(song.song_id)" v-if="ownership" :disabled="isDeletingSong">
                    {{ isDeletingSong ? 'Deleting...' : 'Delete' }}
                </button>
            </div>
            <AddSongs v-if="ownership" :playlist="playlist" @song-added="handleSongAdded" />
        </div>
    </div>
</template>

<script>
import getSongsInPlaylist from '@/composables/getSongsInPlaylist';
import getPlaylist from '@/composables/getPlaylist';
import deletePlaylist from '@/composables/deletePlaylist';
import deleteSongsFromPlaylist from '@/composables/deleteSongsFromPlaylist';
import { useAuth0 } from '@auth0/auth0-vue';
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import AddSongs from '@/components/AddSongs.vue';
import { convertPlaylist } from '@/composables/convert'; // Now only using convertPlaylist function

export default {
    props: ["id"],
    components: { AddSongs },
    setup(props) {
        const error = ref(null);
        const songs = ref([]);
        const playlist = ref({});
        const isPending = ref(true);
        const isDeleting = ref(false);
        const isDeletingSong = ref(false);
        const { user } = useAuth0();
        const router = useRouter();
        const isConverting = ref(false);

        const fetchPlaylistData = async () => {
            try {
                const playlistResult = await getPlaylist(props.id);
                playlist.value = playlistResult.playlist.value || {};
                error.value = playlistResult.error.value;

                const result = await getSongsInPlaylist(props.id);
                songs.value = result.songs.value || [];
                error.value = result.error.value;
            } catch (e) {
                error.value = "An unexpected error occurred";
                console.error(e);
            } finally {
                isPending.value = false;
            }
        };

        onMounted(fetchPlaylistData);

        const ownership = computed(() => {
            return (
                playlist.value &&
                user.value &&
                user.value.sub == playlist.value.user_id
            );
        });

        const handleDeletePlaylist = async () => {
            if (!confirm('Are you sure you want to delete this playlist?')) {
                return;
            }

            isDeleting.value = true;
            error.value = null;

            try {
                const { error: deleteError } = await deletePlaylist(props.id);
                if (deleteError.value) {
                    throw new Error(deleteError.value);
                }
                // Redirect to home page after successful deletion
                router.push({ path: '/', query: { deletedPlaylist: playlist.value.playlist_name } });
            } catch (e) {
                error.value = e.message || "Failed to delete playlist";
                console.error('Error deleting playlist:', e);
            } finally {
                isDeleting.value = false;
            }
        };

        const handleDeleteSong = async (songId) => {
            if (!confirm('Are you sure you want to delete this song from the playlist?')) {
                return;
            }

            isDeletingSong.value = true;
            error.value = null;

            try {
                const { error: deleteError } = await deleteSongsFromPlaylist(props.id, [songId]);
                if (deleteError.value) {
                    throw new Error(deleteError.value);
                }
                // Refresh the playlist data after successful deletion
                await fetchPlaylistData();
                console.log('Song deleted successfully and playlist refreshed');
            } catch (e) {
                error.value = e.message || "Failed to delete song from playlist";
                console.error('Error deleting song from playlist:', e);
            } finally {
                isDeletingSong.value = false;
            }
        };

        const handleSongAdded = async () => {
            console.log('Song added, refreshing playlist data');
            await fetchPlaylistData();
        };

        // Simplified playlist conversion logic
        const handleConvertPlaylist = async (playlistId, service) => {
            isConverting.value = true;
            error.value = null;

            try {
                // Directly call convertPlaylist which handles OAuth login and playlist conversion
                const result = await convertPlaylist(playlistId, service);

                if (result.error) {
                    throw new Error(result.error.value);
                }

                // Handle successful conversion
                console.log("Playlist converted successfully");
            } catch (e) {
                error.value = e.message || "Failed to convert playlist";
                console.error('Error converting playlist:', e);
            } finally {
                isConverting.value = false;
            }
        };

        return {
            error,
            isPending,
            songs,
            playlist,
            ownership,
            handleDeletePlaylist,
            handleDeleteSong,
            handleSongAdded,
            handleConvertPlaylist,
            isDeleting,
            isDeletingSong,
            isConverting,
        };
    }
};
</script>

<style>
/* Same styling as before */
.playlist-details {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 80px;
}

.cover {
    overflow: hidden;
    border-radius: 20px;
    position: relative;
    padding: 160px;
}

.cover img {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    min-width: 100%;
    min-height: 100%;
    max-width: 200%;
    max-height: 200%;
}

.playlist-info {
    text-align: center;
}

.playlist-info h2 {
    text-transform: capitalize;
    font-size: 28px;
    margin-top: 20px;
}

.playlist-info p {
    margin-bottom: 20px;
    text-align: center;
}

.username {
    color: #999;
}

.description {
    text-align: left;
}

.single-song {
    padding: 10px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px dashed var(--secondary);
    margin-bottom: 20px;
}
</style>
