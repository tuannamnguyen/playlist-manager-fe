import { ref } from 'vue'

const usePlaylist = () => {
    const error = ref(null)
    const isPending = ref(false)
    const playlists = ref([])
    const playlist = ref(null)

    const fetchPlaylists = async () => {
        error.value = null
        isPending.value = true
        try {
            const response = await fetch('http://localhost:8080/api/playlists')
            if (!response.ok) {
                throw new Error('Failed to fetch playlists')
            }
            playlists.value = await response.json()
            isPending.value = false
        } catch (err) {
            console.log(err.message)
            error.value = 'Could not fetch playlists'
            isPending.value = false
        }
    }

    const fetchPlaylist = async (id) => {
        error.value = null
        isPending.value = true
        try {
            const response = await fetch(`http://localhost:8080/api/playlists/${id}`)
            if (!response.ok) {
                throw new Error('Failed to fetch playlist')
            }
            playlist.value = await response.json()
            isPending.value = false
        } catch (err) {
            console.log(err.message)
            error.value = 'Could not fetch playlist'
            isPending.value = false
        }
    }

    const createPlaylist = async (playlistName, userId) => {
        error.value = null
        isPending.value = true
        try {
            const response = await fetch('http://localhost:8080/api/playlists', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    playlist_name: playlistName,
                    user_id: userId
                }),
            })
            if (!response.ok) {
                throw new Error('Failed to create playlist')
            }
            const newPlaylist = await response.json()
            playlists.value.push(newPlaylist)
            isPending.value = false
            return newPlaylist
        } catch (err) {
            console.log(err.message)
            error.value = 'Could not create playlist'
            isPending.value = false
        }
    }

    const deletePlaylist = async (id) => {
        error.value = null
        isPending.value = true
        try {
            const response = await fetch(`http://localhost:8080/api/playlists/${id}`, {
                method: 'DELETE',
            })
            if (!response.ok) {
                throw new Error('Failed to delete playlist')
            }
            playlists.value = playlists.value.filter(p => p.id !== id)
            isPending.value = false
        } catch (err) {
            console.log(err.message)
            error.value = 'Could not delete playlist'
            isPending.value = false
        }
    }

    const addSongsToPlaylist = async (playlistId, songs) => {
        error.value = null
        isPending.value = true
        try {
            const response = await fetch(`http://localhost:8080/api/playlists/${playlistId}/songs`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(songs),
            })
            if (!response.ok) {
                throw new Error('Failed to add songs to playlist')
            }
            const updatedPlaylist = await response.json()
            playlist.value = updatedPlaylist
            isPending.value = false
        } catch (err) {
            console.log(err.message)
            error.value = 'Could not add songs to playlist'
            isPending.value = false
        }
    }

    const fetchPlaylistSongs = async (playlistId) => {
        error.value = null
        isPending.value = true
        try {
            const response = await fetch(`http://localhost:8080/api/playlists/${playlistId}/songs`)
            if (!response.ok) {
                throw new Error('Failed to fetch playlist songs')
            }
            const songs = await response.json()
            playlist.value = { ...playlist.value, songs }
            isPending.value = false
        } catch (err) {
            console.log(err.message)
            error.value = 'Could not fetch playlist songs'
            isPending.value = false
        }
    }

    const deleteSongsFromPlaylist = async (playlistId, songIds) => {
        error.value = null
        isPending.value = true
        try {
            const response = await fetch(`http://localhost:8080/api/playlists/${playlistId}/songs`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ songs_id: songIds }),
            })
            if (!response.ok) {
                throw new Error('Failed to delete songs from playlist')
            }
            const updatedPlaylist = await response.json()
            playlist.value = updatedPlaylist
            isPending.value = false
        } catch (err) {
            console.log(err.message)
            error.value = 'Could not delete songs from playlist'
            isPending.value = false
        }
    }

    return {
        error,
        isPending,
        playlists,
        playlist,
        fetchPlaylists,
        fetchPlaylist,
        createPlaylist,
        deletePlaylist,
        addSongsToPlaylist,
        fetchPlaylistSongs,
        deleteSongsFromPlaylist
    }
}

export default usePlaylist