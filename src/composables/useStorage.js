import { ref } from "@vue/runtime-dom";
import getUser from './getUser'

const { user } = getUser()

const useStorage = () => {
    const err = ref(null)
    const url = ref(null)
    const filePath = ref(null)

    const uploadImage = async (file) => {
        filePath.value = `covers/${user.value.uid}/${file.name}`

        try {
            // Mock API call
            const formData = new FormData()
            formData.append('file', file)
            formData.append('filePath', filePath.value)

            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            })

            if (!response.ok) {
                throw new Error('Upload failed')
            }

            const result = await response.json()
            url.value = result.url
        } catch (error) {
            console.log(error.message)
            err.value = error.message
        }
    }

    const deleteImage = async (path) => {
        try {
            // Mock API call
            const response = await fetch('/api/delete-image', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ path }),
            })

            if (!response.ok) {
                throw new Error('Delete failed')
            }
        } catch (error) {
            console.log(error.message)
            err.value = error.message
        }
    }

    return { url, filePath, err, uploadImage, deleteImage }
}

export default useStorage