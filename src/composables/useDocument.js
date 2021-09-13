import { ref } from 'vue'
import { projectFirestore } from '../firebase/config'

const useCollection = (collection, id) => {

    const error = ref(null)
    const isPending = ref(false)

    let docRef = projectFirestore.collection(collection).doc(id)
    // add a new document
    const deleteDoc = async () => {
        error.value = null
        isPending.value = true

        try {
            const res = await docRef.delete()
            isPending.value = false
            return res
        }
        catch (err) {
            console.log(err.message)
            isPending.value=false
            error.value = 'could not delete the document'
        }
    }


    const updateDoc = async (updates) => {
        error.value = null
        isPending.value = true

        try {
            const res = await docRef.update(updates)
            isPending.value = false
            return res
        }
        catch (err) {
            console.log(err.message)
            isPending.value=false
            error.value = 'could not update the document'
        }
    }


    return { error, isPending, deleteDoc, updateDoc }

}

export default useCollection