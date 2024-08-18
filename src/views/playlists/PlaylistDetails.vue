<template>
    <div v-if="error" class="error">{{ error }}</div>
    <div v-if="playlist" class="playlist-details">
        <div class="playlist-info">
            <div class="cover">
                <img :src="playlist.cover_url" />
            </div>
            <h2>{{ playlist.playlist_name }}</h2>
            <p>Created by {{ playlist.user_name }}</p>
            <p class="description">{{ playlist.description }}</p>
            <button v-if="ownership" @click="handleDelete">Delete Playlist</button>
        </div>

        <div class="song-list">
            <div v-if="!playlist.songs || !playlist.songs.length">
                No songs have been added to this playlist yet
            </div>
            <div v-else v-for="song in playlist.songs" :key="song.id" class="single-song">
                <div class="details">
                    <h3>{{ song.song_name }}</h3>
                    <p>{{ song.artist_names.join(', ') }}</p>
                </div>
                <button @click="handleDeleteSong(song.id)" v-if="ownership">delete</button>
            </div>
            <AddSong v-if="ownership" :playlist="playlist" />
        </div>
    </div>
</template>

<script>
import AddSong from "@/components/AddSong.vue";
import usePlaylist from "@/composables/usePlaylist";
import { computed } from "vue";
import { useRouter } from "vue-router";

export default {
    props: ["id"],
    components: { AddSong },
    setup(props) {
        const { error, playlist, fetchPlaylist, deletePlaylist, deleteSongsFromPlaylist } = usePlaylist();
        const router = useRouter();

        fetchPlaylist(props.id);

        const ownership = computed(() => {
            return playlist.value && playlist.value.user_id === '1'; // Replace '1' with actual user ID
        });

        const handleDelete = async () => {
            await deletePlaylist(props.id);
            router.push({ name: "Home" });
        };

        const handleDeleteSong = async (songId) => {
            await deleteSongsFromPlaylist(props.id, [songId]);
        };

        return { error, playlist, ownership, handleDelete, handleDeleteSong };
    },
};
</script>

<style>
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