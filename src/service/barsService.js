import axios from 'axios'
const apiClient = axios.create({
  baseURL: 'http://localhost:8080/api/bars',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  async getBars() {
    try {
      const response = await apiClient.get('/')
      return response.data
    } catch {
      throw 'error de conexion en cargar'
    }
  },
  async addBar(bar) {
    try {
      await apiClient.post('/', bar)
    } catch {
      throw 'error adding bar'
    }
  },
  async editBar(user) {
    try {
      await apiClient.put('/', bar)
    } catch {
      throw 'error adding bar'
    }
  },
  async loginBar(bar) {
    try {
      const barFound = await apiClient.post('/login', bar)
      return barFound.data
    } catch {
      throw 'Error loggin in bar'
    }
  }
}
