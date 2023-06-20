import axios from 'axios'
const apiClient = axios.create({
  baseURL: 'http://localhost:8080/api/bands',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  async getBandById(_id) {
    try {
      const response = await apiClient.get(`/${_id}`)
      return response.data
    } catch (error) {
      console.error(error.message)
    }
  },
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
  async editBand(bandId, data) {
    try {
      const response = await apiClient.put(`/${bandId}`, data)
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
