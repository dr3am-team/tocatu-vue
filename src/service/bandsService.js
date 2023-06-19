import axios from 'axios'
const apiClient = axios.create({
  baseURL: 'http://localhost:8080/api/bands',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  async getBands() {
    try {
      const response = await apiClient.get('/')
      return response.data
    } catch {
      throw 'error de conexion en cargar'
    }
  },
  async addBand(band) {
    try {
      const bandCreated = await apiClient.post('/', band)
      return bandCreated
    } catch {
      throw 'error adding band'
    }
  },
  async editBand(bandId, eventId) {
    try {
      const response = await apiClient.put(`/${bandId}`, eventId)
      return response
    } catch {
      throw 'error editing band'
    }
  },
  async loginBand(band) {
    try {
      const bandFound = await apiClient.post('/login', band)
      return bandFound.data
    } catch (error) {
      throw error
    }
  }
}
