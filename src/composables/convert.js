import { ref } from 'vue';

const apiServerUrl = import.meta.env.VITE_API_SERVER_URL;

// Function to convert a playlist to a specific service
export const convertPlaylist = async (playlistId, service) => {
    const error = ref(null);
    const isPending = ref(true);
    const conversionResult = ref(null);

    try {
        const response = await fetch(`${apiServerUrl}/api/playlists/${playlistId}/convert/${service}`, {
            method: 'POST',
        });
        if (!response.ok) {
            throw new Error(`Failed to convert playlist to ${service}`);
        }
        conversionResult.value = await response.json();
    } catch (err) {
        console.error(`Error converting playlist to ${service}:`, err);
        error.value = `Could not convert playlist to ${service}`;
    } finally {
        isPending.value = false;
    }

    return { error, isPending, conversionResult };
};
