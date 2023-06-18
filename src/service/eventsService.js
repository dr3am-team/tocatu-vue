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
    } catch (error) {
      console.error(error.message)
    }
  },

  /**
   * Obtiene un evento por su ID desde la API.
   * @param {string} _id - El ID del evento que se desea obtener.
   * @returns {Promise<Object>} - Una promesa que se resuelve con los datos del evento.
   * @throws {Error} - Si ocurre un error al obtener el evento.
   */
  async getEventById(_id) {
    try {
      const response = await apiClient.get(`/${_id}`)
      return response.data
    } catch (error) {
      console.error(error.message)
    }
  },
  async addEvent(event, username) {
    const data = { event, username }

    try {
      const eventCreated = await apiClient.post('/', data)

      return eventCreated
    } catch (error) {
      console.error(error.message)
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
      console.error(error.message)
    }
  }
}
