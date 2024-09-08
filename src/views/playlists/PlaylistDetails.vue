<template>
    <div v-if="error" class="error">{{ error }}</div>
    <div v-if="playlist" class="playlist-details">
        <div class="playlist-info">
            <div class="cover">
                <!-- TODO: remove hardcode -->
                <img src="https://picsum.photos/200/300" />
            </div>
            <h2>{{ playlist.title }}</h2>
            <p>Created by Nam</p>
            <p class="description">Lorem ipsum</p>
            <button>Delete Playlist</button>
        </div>

        <div class="song-list">
            <!-- TODO: remove hardcode -->
            <div v-if="!1">
                No songs have been added to this playlist yet
            </div>
            <div v-for="(song, index) in playlist" :key="index" class="single-song">
                <div class="details">
                    <h3>{{ song.song_name }}</h3>
                    <p>{{ song.artist_names }}</p>
                    <p v-for="artist in playlist.artist_names">{{ artist }}, </p>
                </div>
                <button>delete</button>
            </div>
        </div>
    </div>
</template>


<script>
import getSongsInPlaylist from '@/composables/getSongsInPlaylist';

export default {
    props: ["id"],
    setup(props) {
        const { error, document: playlist } = getSongsInPlaylist("playlist", props.id);
        return { error, playlist }
    }
}
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
