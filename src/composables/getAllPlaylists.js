import { ref } from "vue";

const apiServerUrl = import.meta.env.VITE_API_SERVER_URL;

const getAllPlaylists = async () => {
    const error = ref(null);
    const isPending = ref(true);
    const playlists = ref([]);

    try {
        const response = await fetch(`${apiServerUrl}/api/playlists`);
        if (!response.ok) {
            throw new Error('Failed to fetch playlists');
        }
        playlists.value = await response.json();
        console.log('Fetched playlists:', playlists.value);
    } catch (err) {
        console.error('Error fetching playlists:', err);
        error.value = 'Could not fetch playlists';
    } finally {
        isPending.value = false;
    }

    return { error, isPending, playlists };
};

export default getAllPlaylists;
