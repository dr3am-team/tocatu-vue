import axios from 'axios'
const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:8080',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  async cargarUsuarios() {
    try {
      const response = await apiClient.get('/users')
      return response.data
    } catch {
      throw 'error de conexion en cargar'
    }
  },
  async addUser(user) {
    try {
      await apiClient.post('/users', user)
    } catch {
      throw 'error adding user'
    }
  },
  async editUser(user) {
    try {
      await apiClient.put('/users', user)
    } catch {
      throw 'error adding user'
    }
  }
}
