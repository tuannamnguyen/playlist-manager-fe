import { ref, watchEffect } from 'vue'

const getCollection = (collection, query) => {
    const documents = ref(null)
    const error = ref(null)

    const fetchData = async () => {
        try {
            // Mock API call
            const response = await fetch(`/api/${collection}`)
            if (!response.ok) {
                throw new Error('Failed to fetch data')
            }
            let results = await response.json()

            if (query) {
                // Simple client-side filtering (replace with server-side filtering in a real API)
                results = results.filter(item => item[query[0]] === query[2])
            }

            results.sort((a, b) => a.createdAt - b.createdAt)
            documents.value = results
            error.value = null
        } catch (err) {
            console.log(err.message)
            documents.value = null
            error.value = 'Could not fetch the data'
        }
    }

    fetchData()

    watchEffect((onInvalidate) => {
        const intervalId = setInterval(fetchData, 5000) // Polling every 5 seconds to simulate real-time updates
        onInvalidate(() => clearInterval(intervalId))
    })

    return { error, documents }
}

export default getCollection