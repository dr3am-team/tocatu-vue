import axios from 'axios'
const apiClient = axios.create({
  baseURL: 'http://localhost:8080/api/users',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  async getUsers() {
    try {
      const response = await apiClient.get('/')
      return response.data
    } catch {
      throw 'error de conexion en cargar'
    }
  },
  async addUser(user) {
    try {
      const userCreated = await apiClient.post('/', user)
      return userCreated
    } catch {
      throw 'error adding user'
    }
  },
  async getUserById(_id) {
    try {
      const response = await apiClient.get(`/${_id}`)
      return response.data
    } catch (error) {
      console.error(error.message)
    }
  },
  async editUser(userId, eventId) {
    try {
      const response = await apiClient.put(`/${userId}`, eventId)
      return response
    } catch {
      throw 'error adding user'
    }
  },
  async loginUser(user) {
    try {
      const userFound = await apiClient.post('/login', user)
      return userFound.data
    } catch (error) {
      throw error
    }
  }
}
