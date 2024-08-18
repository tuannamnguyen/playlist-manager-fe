import { ref, watchEffect } from 'vue'

const getDocument = (collection, id) => {
    const document = ref(null)
    const error = ref(null)

    const fetchDocument = async () => {
        try {
            // Mock API call
            const response = await fetch(`/api/${collection}/${id}`)
            if (!response.ok) {
                throw new Error('Failed to fetch document')
            }
            const data = await response.json()
            if (data) {
                document.value = { ...data, id }
                error.value = null
            } else {
                error.value = 'That document does not exist'
            }
        } catch (err) {
            console.log(err.message)
            error.value = 'Could not fetch the data'
        }
    }

    fetchDocument()

    watchEffect((onInvalidate) => {
        const intervalId = setInterval(fetchDocument, 5000) // Polling every 5 seconds to simulate real-time updates
        onInvalidate(() => clearInterval(intervalId))
    })

    return { error, document }
}

export default getDocument