<template>
  <div>
    <label for="user"> User: <input name="user" type="text" v-model="user.username" /> </label>
    <label for="password"> Password: <input name="password" type="password" v-model="user.password" /> </label>
    <button @click="login">Login</button>
  </div>
</template>

<script>
import { useLoginStore } from '../stores/login'
export default {
  components: { useLoginStore },
  setup() {
    const { loginStore } = useLoginStore()
    return { loginStore }
  },
  data() {
    return {
      user: { username: '', password: '' }
    }
  },
  methods: {
    login() {
      //Input of user and passw
      const { username, password } = this.user

      //Bring users from local storage
      const users = JSON.parse(window.localStorage.getItem('usuarios'))

      const user = users.find((element) => element.username === username)
      if (user && user.password == password) {
        console.log('adentro de login')
        this.loginStore({ username: username, permissions: [user.userType] })
        this.$router.push('/')
      }
    }
  }
}
</script>

<style></style>
