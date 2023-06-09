import axios from 'axios'
const apiClient = axios.create({
  baseURL: 'http://localhost:8080/api/events'
})

export default {
  async getEvents(route = '/') {
    try {
      const response = await apiClient.get(route)
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
  async uploadImage(formData, _id) {
    try {
      console.log(formData)
      const imageUploaded = await apiClient.post(`/upload/${_id}`, formData, { 'Content-Type': 'multipart/form-data' })

      return imageUploaded
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
  async editEvent(eventId, data) {
    try {
      const response = await apiClient.put(`/${eventId}`, data)
      return response
    } catch (error) {
      console.error(error.message)
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
  },
  async deleteEvent(id) {
    try {
      const eventDeleted = await apiClient.delete(`/${id}`)
      return eventDeleted
    } catch (error) {
      console.error(error)
    }
  }
}
