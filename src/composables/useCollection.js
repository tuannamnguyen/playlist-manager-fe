import { ref } from 'vue'

const useCollection = (collection) => {
  const error = ref(null)
  const isPending = ref(false)

  const addDoc = async (doc) => {
    error.value = null
    isPending.value = true

    try {
      // Mock API call
      const response = await fetch(`/api/${collection}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(doc),
      })

      if (!response.ok) {
        throw new Error('Failed to add document')
      }

      isPending.value = false
      return await response.json()
    } catch (err) {
      console.log(err.message)
      error.value = 'Could not send the message'
      isPending.value = false
    }
  }

  return { error, addDoc, isPending }
}

export default useCollection