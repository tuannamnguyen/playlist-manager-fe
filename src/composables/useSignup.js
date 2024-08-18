import { ref } from 'vue'

const error = ref(null)
const isPending = ref(false)

const signup = async (email, password, displayName) => {
  error.value = null
  isPending.value = true

  try {
    // Mock API call
    const response = await fetch('/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, displayName }),
    })

    if (!response.ok) {
      throw new Error('Could not complete signup')
    }

    const res = await response.json()
    error.value = null
    isPending.value = false

    return res
  }
  catch (err) {
    console.log(err.message)
    error.value = err.message
    isPending.value = false
  }
}

const useSignup = () => {
  return { error, signup, isPending }
}

export default useSignup