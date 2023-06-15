<template>
  <NavbarComponent></NavbarComponent>

  <div class="super-container">
    <div class="container">
      <InputComponent type="text" v-model="user.username" label="Usuario" @keyup.enter="handleKeyPress" />
      <InputComponent type="password" v-model="user.password" label="Contraseña" @keyup.enter="handleKeyPress" />
      <ButtonComponent label="Login" @click="login" />
      <p class="login-error" v-if="failedLogin">{{ failedLogin }}</p>
    </div>
    <FooterComponent></FooterComponent>
  </div>
</template>

<script>
import { useLoginStore } from '../stores/login'
import ButtonComponent from '../components/ButtonComponent.vue'
import InputComponent from '../components/InputComponent.vue'
import axios from 'axios'
import barsService from '../service/barsService.js'
import FooterComponent from '../components/FooterComponent.vue'
import NavbarComponent from '../components/NavbarComponent.vue'

export default {
  components: { ButtonComponent, InputComponent, NavbarComponent, FooterComponent },
  setup() {
    const { loginStore } = useLoginStore()
    return { loginStore }
  },
  data() {
    return {
      user: { username: '', password: '' },
      failedLogin: ''
    }
  },
  methods: {
    async login() {
      //Input of user and passw
      const { username, password } = this.user

      //Bring users from local storage
      //const users = JSON.parse(window.localStorage.getItem('usuarios'))
      try {
        const bar = await barsService.loginBar(this.user)
        console.log(bar)
        if (bar) {
          this.loginStore({ bar, permissions: [bar.userType] })
          this.$router.push('/')
        }
        console.log(bar)
      } catch {}
      // console.log(users)
    },
    handleKeyPress() {
      this.login()
    }
  }
}
</script>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;
  margin: 0 auto;

  .login-error {
    border: 1px solid red;
    padding: 10px;
    margin-top: 10px;
    color: red;
    font-weight: bold;
  }
}
.super-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
