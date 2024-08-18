import { ref } from 'vue'

const useDocument = (collection, id) => {
    const error = ref(null)
    const isPending = ref(false)

    const deleteDoc = async () => {
        error.value = null
        isPending.value = true

        try {
            // Mock API call
            const response = await fetch(`/api/${collection}/${id}`, {
                method: 'DELETE',
            })

            if (!response.ok) {
                throw new Error('Failed to delete document')
            }

            isPending.value = false
            return await response.json()
        } catch (err) {
            console.log(err.message)
            isPending.value = false
            error.value = 'Could not delete the document'
        }
    }

    const updateDoc = async (updates) => {
        error.value = null
        isPending.value = true

        try {
            // Mock API call
            const response = await fetch(`/api/${collection}/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updates),
            })

            if (!response.ok) {
                throw new Error('Failed to update document')
            }

            isPending.value = false
            return await response.json()
        } catch (err) {
            console.log(err.message)
            isPending.value = false
            error.value = 'Could not update the document'
        }
    }

    return { error, isPending, deleteDoc, updateDoc }
}

export default useDocument