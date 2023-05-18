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
      const { username, password } = this.user
      const users = JSON.parse(window.localStorage.getItem('usuarios'))
      console.log(users)
      const user = users.find((element) => element.username === username)
      console.log('afuera de login')
      console.log(user)
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
