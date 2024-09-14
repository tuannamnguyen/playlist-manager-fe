<template>
    <div>
        <div v-for="playlist in validPlaylists" :key="playlist.playlist_id">
            <router-link :to="{ name: 'PlaylistDetails', params: { id: playlist.playlist_id } }">
                <div class="single">
                    <div class="thumbnail">
                        <img :src="playlist.image_url || 'https://picsum.photos/200/300'"
                            :alt="playlist.playlist_name" />
                    </div>
                    <div class="info">
                        <h3>{{ playlist.playlist_name }}</h3>
                        <!-- TODO: need to replace with user name here -->
                        <p>created by {{ playlist.user_name }}</p>
                    </div>
                </div>
            </router-link>
        </div>
    </div>
</template>

<script>
import { computed } from 'vue';

export default {
    props: {
        playlists: {
            type: Array,
            required: true
        }
    },
    setup(props) {
        const validPlaylists = computed(() =>
            props.playlists.filter(playlist =>
                playlist && playlist.playlist_id && playlist.playlist_name
            )
        );

        return { validPlaylists };
    }
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
