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
  async getBarById(_id) {
    try {
      const response = await apiClient.get(`/${_id}`)
      return response.data
    } catch (error) {
      console.error(error.message)
    }
  },
  async addBar(bar) {
    try {
      const barCreated = await apiClient.post('/', bar)
      return barCreated
    } catch (error) {
      console.error(error)
      throw error + 'error creating bar'
    }
  },
  async editBar(id, data) {
    try {
      const res = await apiClient.put(`/${id}`, data)
      return res
    } catch {
      throw 'error adding bar'
    }
  },
  async loginBar(bar) {
    try {
      const barFound = await apiClient.post('/login', bar)
      return barFound.data
    } catch (error) {
      throw 'error adding bar' + error.message
    }
  }
}
