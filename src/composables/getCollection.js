import { ref } from "vue";

const getCollection = () => {
    // TODO: replace with real API later

    const playlists = ref(null);
    const error = ref(null);

    playlists.value = [
        {
            "playlist_id": 1,
            "playlist_name": "Chill Vibes",
            "user_id": "1",
            "updated_at": "2024-08-24T04:05:57.469908Z",
            "created_at": "2024-08-24T04:05:57.469908Z",
            "image_url": "https://picsum.photos/200/300"
        },
        {
            "playlist_id": 2,
            "playlist_name": "Workout Hits",
            "user_id": "2",
            "updated_at": "2024-08-24T04:05:57.469908Z",
            "created_at": "2024-08-24T04:05:57.469908Z",
            "image_url": "https://picsum.photos/200/300",
        },
        {
            "playlist_id": 3,
            "playlist_name": "Classic Rock",
            "user_id": "3",
            "updated_at": "2024-08-24T04:05:57.469908Z",
            "created_at": "2024-08-24T04:05:57.469908Z",
            "image_url": "https://picsum.photos/200/300",
        }
    ];

    error.value = null;

    return { error, playlists };
}

export default getCollection;
