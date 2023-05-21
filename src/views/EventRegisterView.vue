<template>
  <div>
    <label for="style">Date <input type="date" v-model="event.date" /></label>
    <label for="style">Name <input type="text" v-model="event.name" /></label>
  </div>
  <button @click="register">Register</button>
</template>

<script>
import { storeToRefs } from 'pinia'
import { useLoginStore } from '../stores/login'
export default {
  setup() {
    const store = useLoginStore()
    const { user } = storeToRefs(store)
    return { user }
  },
  data() {
    return {
      event: {}
    }
  },
  methods: {
    register() {
      const users = JSON.parse(window.localStorage.getItem('usuarios'))

      const userLoggedIn = users.find((element) => element.username === this.user.username)

      this.event.address = userLoggedIn.address
      this.event.capacity = userLoggedIn.capacity
      this.event.barName = userLoggedIn.name
      this.event.mail = userLoggedIn.mail

      userLoggedIn.events.push(this.event)

      const datosEnString = JSON.stringify(users, null, '\t')
      window.localStorage.setItem('usuarios', datosEnString)
    }
  }
}
</script>

<style></style>
