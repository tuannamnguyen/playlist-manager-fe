import { ref } from 'vue';

const apiServerUrl = import.meta.env.VITE_API_SERVER_URL;

// Function to initiate OAuth login
export const initiateOAuthLogin = async (service) => {
    const error = ref(null);
    const isPending = ref(true);

    try {
        // Instead of fetching, we'll redirect the user to our backend endpoint
        window.location.href = `${apiServerUrl}/api/oauth/${service}`;
    } catch (err) {
        console.error(`Error initiating ${service} OAuth:`, err);
        error.value = `Could not initiate ${service} OAuth`;
    } finally {
        isPending.value = false;
    }

    return { error, isPending };
};

// Function to handle OAuth logout
export const handleOAuthLogout = async (service) => {
    const error = ref(null);
    const isPending = ref(true);
    const logoutSuccess = ref(false);

    try {
        const response = await fetch(`${apiServerUrl}/api/oauth/logout/${service}`);
        if (!response.ok) {
            throw new Error(`Failed to logout from ${service}`);
        }
        logoutSuccess.value = true;
    } catch (err) {
        console.error(`Error logging out from ${service}:`, err);
        error.value = `Could not logout from ${service}`;
    } finally {
        isPending.value = false;
    }

    return { error, isPending, logoutSuccess };
};
