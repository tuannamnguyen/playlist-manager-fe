<template>
    <div v-for="playlist in playlists" :key="playlist.playlist_id">
        <router-link :to="{ name: 'PlaylistDetails', params: { id: playlist.playlist_id } }">
            <div class="single">
                <div class="thumbnail">
                    <img :src="playlist.image_url" />
                    <p>{{ playlist.image_url }}</p>
                </div>
                <div class="info">
                    <h3>{{ playlist.playlist_name }}</h3>
                    <!-- TODO: need to replace with user name here -->
                    <p>created by {{ playlist.user_id }}</p>
                </div>
            </div>
        </router-link>
    </div>
</template>

<script>
export default {
    props: ["playlists"]
}
</script>

<style scoped>
.single {
    display: flex;
    align-items: center;
    padding: 20px;
    border-radius: 10px;
    background: white;
    margin: 16px 0;
    transition: all ease 0.2s;
}

.single:hover {
    box-shadow: 1px 2px 10px rgba(50, 50, 50, 0.5);
    transform: scale(1.02);
    transition: all ease 0.2s;
}

.thumbnail {
    max-width: 100px;
    max-height: 100px;
    overflow: hidden;
    border-radius: 10px;
}

img {
    max-width: 150%;
    max-height: 150%;
    display: block;
}

.info {
    margin: 0 30px;
}

.song-number {
    margin-left: auto;
}
</style>
