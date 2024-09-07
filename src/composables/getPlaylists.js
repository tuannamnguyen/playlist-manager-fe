import { ref } from "vue";

const apiServerUrl = import.meta.env.VITE_API_SERVER_URL;

const getPlaylists = async () => {
    const error = ref(null);
    const isPending = ref(false);
    const playlists = ref([]);

    error.value = null
    isPending.value = true
    try {
        const response = await fetch(`${apiServerUrl}/api/playlists`)
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

    return { error, playlists };
}

export default getPlaylists;
