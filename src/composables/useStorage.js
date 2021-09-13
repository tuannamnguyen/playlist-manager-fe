import { ref } from "@vue/runtime-dom";
import { projectStorage } from "../firebase/config";
import getUser from './getUser'

const { user } = getUser() // shouldn't be null from the start

const useStorage = () => {
    const err = ref(null)
    const url = ref(null)
    const filePath = ref(null)

    const uploadImage = async (file) => {
        // * in template strings we can output variables using ${}
        filePath.value = `covers/${user.value.uid}/${file.name}`
        const storageRef = projectStorage.ref(filePath.value) //! every thing that is ref needs a .value

        try {
            const res = await storageRef.put(file)
            url.value = await res.ref.getDownloadURL()
        } catch (error) {
            console.log(error.message)
            err.value = error.message
        }
    }

    const deleteImage = async (path) => {
        const storageRef = projectStorage.ref(path)
        try {
            storageRef.delete()
        } catch (err) {
            console.log(err.message)
            error.value = err.message
        }
    }

    return { url, filePath, err, uploadImage, deleteImage }
}

export default useStorage