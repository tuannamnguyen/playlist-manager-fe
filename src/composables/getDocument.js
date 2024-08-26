import { ref } from "vue";

const getDocument = (collection, id) => {
    const document = ref(null)
    const error = ref(null)

    document.value = [
        {
            "song_id": 4,
            "song_name": "devil in a new dress",
            "artist_names": [
                "kanye west",
                "rick ross"
            ],
            "album_name": "mbdtf",
            "updated_at": "2024-08-14T08:45:55.654823Z",
            "created_at": "2024-08-14T08:45:55.654823Z"
        },
        {
            "song_id": 5,
            "song_name": "runaway",
            "artist_names": [
                "pusha t",
                "kanye west"
            ],
            "album_name": "mbdtf",
            "updated_at": "2024-08-14T08:45:55.654823Z",
            "created_at": "2024-08-14T08:45:55.654823Z"
        }
    ]

    error.value = null

    return { error, document}
}

export default getDocument
