import axios from 'axios'
const apiClient = axios.create({
  baseURL: 'http://localhost:8080/api/events',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  async getEvents() {
    try {
      const response = await apiClient.get('/')
      return response.data
    } catch {
      throw 'error de conexion en cargar'
    }
  },
  async addEvent(event, username) {
    const data = { event, username }
    try {
      const eventCreated = await apiClient.post('/', data)
      console.log(eventCreated)
      return eventCreated
    } catch {
      throw 'error adding event'
    }
  },
  async editEvent(event) {
    try {
      await apiClient.put('/', event)
    } catch {
      throw 'error adding event'
    }
  },
  async loginEvent(event) {
    try {
      const eventFound = await apiClient.post('/login', event)
      return eventFound.data
    } catch (error) {
      throw error
    }
  }
}
