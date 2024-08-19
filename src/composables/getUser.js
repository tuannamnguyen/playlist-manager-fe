import { ref } from 'vue'

const user = ref(null)

const mockAuthStateChange = () => {
  // Simulate auth state change
  setTimeout(() => {
    const mockUser = { id: '1', name: 'John Doe', email: 'john@example.com' }
    console.log('User state change. Current user is:', mockUser)
    user.value = mockUser
  }, 1000)
}

mockAuthStateChange()

const getUser = () => {
  return { user }
}

export default getUser
