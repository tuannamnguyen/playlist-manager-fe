import { ref } from 'vue'

const error = ref(null)
const isPending = ref(false)

const logout = async () => {
  error.value = null
  isPending.value = true

  try {
    // Mock API call
    const response = await fetch('/api/logout', {
      method: 'POST',
    })

    if (!response.ok) {
      throw new Error('Logout failed')
    }

    isPending.value = false
  }
  catch (err) {
    console.log(err.message)
    error.value = err.message
    isPending.value = false
  }
}

const useLogout = () => {
  return { error, logout, isPending }
}

export default useLogout
