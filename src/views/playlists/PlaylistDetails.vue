<template>
    <div v-if="playlist" class="spotify-playlist">
        <div class="playlist-header">
            <div class="cover">
                <img :src="playlist.coverUrl || 'https://picsum.photos/300/300'" :alt="playlist.playlist_name" />
            </div>
            <div class="playlist-info">
                <span class="playlist-type">PUBLIC PLAYLIST</span>
                <h1>{{ playlist.playlist_name }}</h1>
                <p class="meta-info">
                    <img :src="playlist.userAvatarUrl || 'https://picsum.photos/30/30'" class="user-avatar" />
                    {{ playlist.user_name }} • {{ songs.length }} songs, {{ totalDuration }}
                </p>
            </div>
        </div>

        <div class="playlist-controls">
            <button class="play-button">
                <span class="play-icon">▶</span>
            </button>
            <button v-if="ownership"
                @click="handleConvertPlaylist(playlist.playlist_id, 'spotify', playlist.playlist_name)"
                :disabled="isConverting" class="action-button convert-button">
                {{ isConverting ? 'Converting...' : 'Convert to Spotify' }}
            </button>
            <button v-if="ownership" @click="handleDeletePlaylist" :disabled="isDeleting"
                class="action-button delete-button">
                {{ isDeleting ? 'Deleting...' : 'Delete Playlist' }}
            </button>
        </div>

        <div class="song-list">
            <div class="song-list-header">
                <span class="song-number">#</span>
                <span class="song-title">TITLE</span>
                <span class="song-album">ALBUM</span>
                <span class="song-date-added">DATE ADDED</span>
                <span class="song-duration">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM0 8a8 8 0 1116 0A8 8 0 010 8z"></path>
                        <path d="M8 3.25a.75.75 0 01.75.75v3.25H11a.75.75 0 010 1.5H7.25V4A.75.75 0 018 3.25z"></path>
                    </svg>
                </span>
            </div>
            <div v-for="(song, index) in songs" :key="index" class="song-item">
                <span class="song-number">{{ index + 1 }}</span>
                <div class="song-title-info">
                    <img :src="song.coverUrl || 'https://picsum.photos/40/40'" :alt="song.song_name"
                        class="song-cover" />
                    <div>
                        <div class="song-name">{{ song.song_name }}</div>
                        <div class="song-artist">{{ song.artist_names.join(', ') }}</div>
                    </div>
                </div>
                <span class="song-album">{{ song.album_name }}</span>
                <span class="song-date-added">Jan 1, 2024</span>
                <span class="song-duration">3:30</span>
                <button v-if="ownership" @click="() => handleDeleteSong(song.song_id)" class="delete-song-button"
                    :disabled="isDeletingSong">
                    ✕
                </button>
            </div>
        </div>

        <AddSongs v-if="ownership" :playlist="playlist" @song-added="handleSongAdded" />
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
        const handleConvertPlaylist = async (playlistId, service, playlistName) => {
            isConverting.value = true;
            error.value = null;

            try {
                // Directly call convertPlaylist which handles OAuth login and playlist conversion
                const result = await convertPlaylist(playlistId, service, playlistName);

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

<style scoped>
.spotify-playlist {
    background-color: #121212;
    color: #ffffff;
    padding: 20px;
    font-family: 'Helvetica Neue', Arial, sans-serif;
}

.playlist-header {
    display: flex;
    align-items: flex-end;
    margin-bottom: 20px;
}

.cover {
    width: 232px;
    height: 232px;
    margin-right: 24px;
    box-shadow: 0 4px 60px rgba(0, 0, 0, 0.5);
}

.cover img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.playlist-info {
    flex: 1;
}

.playlist-type {
    font-size: 12px;
    font-weight: 700;
    color: #b3b3b3;
}

h1 {
    font-size: 96px;
    font-weight: 900;
    margin: 0.08em 0 0.12em;
    color: #ffffff;
}

.meta-info {
    display: flex;
    align-items: center;
    font-size: 14px;
    color: #b3b3b3;
}

.user-avatar {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    margin-right: 8px;
}

.playlist-controls {
    display: flex;
    align-items: center;
    margin-bottom: 32px;
}

.play-button {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background-color: #1db954;
    border: none;
    color: #000000;
    font-size: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 32px;
    cursor: pointer;
}

.action-button {
    background-color: rgba(255, 255, 255, 0.1);
    border: none;
    color: #ffffff;
    padding: 8px 16px;
    border-radius: 4px;
    margin-right: 16px;
    cursor: pointer;
    font-weight: bold;
    transition: background-color 0.2s;
}

.action-button:hover {
    background-color: rgba(255, 255, 255, 0.2);
}

.song-list {
    margin-top: 24px;
}

.song-list-header,
.song-item {
    display: grid;
    grid-template-columns: 16px 4fr 3fr 2fr 1fr 16px;
    padding: 8px 16px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.song-list-header {
    color: #b3b3b3;
    font-size: 12px;
    letter-spacing: 1px;
}

.song-item {
    font-size: 14px;
    align-items: center;
}

.song-item:hover {
    background-color: rgba(255, 255, 255, 0.1);
}

.song-title-info {
    display: flex;
    align-items: center;
}

.song-cover {
    width: 40px;
    height: 40px;
    margin-right: 16px;
}

.song-name {
    font-weight: 400;
    color: #ffffff;
}

.song-artist,
.song-album,
.song-date-added,
.song-duration {
    color: #b3b3b3;
}

.delete-song-button {
    background-color: transparent;
    border: none;
    color: #b3b3b3;
    cursor: pointer;
    font-size: 16px;
    opacity: 0;
    transition: opacity 0.2s;
}

.song-item:hover .delete-song-button {
    opacity: 1;
}

.delete-song-button:hover {
    color: #ffffff;
}
</style>
