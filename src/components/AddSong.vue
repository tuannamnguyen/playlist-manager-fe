<template>
  <div class="add-song">
    <button v-if="!showForm" @click="showForm = true">Add Songs</button>
    <form v-if="showForm" @submit.prevent="handleSubmit">
      <h4>Add a New Song</h4>
      <input type="text" placeholder="Song title" required v-model="songName">
      <input type="text" placeholder="Artist(s) (comma-separated)" required v-model="artistNames">
      <input type="text" placeholder="Album name" required v-model="albumName">
      <button>Add</button>
    </form>
  </div>
</template>

<script>
import usePlaylist from '@/composables/usePlaylist';
import { ref } from 'vue';

export default {
  props: ['playlist'],
  setup(props) {
    const songName = ref('')
    const artistNames = ref('')
    const albumName = ref('')
    const showForm = ref(false)
    const { addSongsToPlaylist } = usePlaylist()

    const handleSubmit = async () => {
      const newSong = {
        song_name: songName.value,
        artist_names: artistNames.value.split(',').map(name => name.trim()),
        album_name: albumName.value
      }
      await addSongsToPlaylist(props.playlist.id, [newSong])
      songName.value = ''
      artistNames.value = ''
      albumName.value = ''
      showForm.value = false
    }

    return { songName, artistNames, albumName, showForm, handleSubmit }
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
</style>