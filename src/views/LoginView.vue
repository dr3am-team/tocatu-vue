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
import usersService from '../service/usersService'
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
        const users = await usersService.cargarUsuarios()
        console.log('🚀 ~ file: LoginView.vue:37 ~ login ~ users:', users)

        const user = users.find((element) => element.username === username)
        if (user && user.password == password) {
          this.loginStore({ username: username, permissions: [user.userType] })
          this.$router.push('/')
        } else {
          this.failedLogin = 'Usuario o contraseña incorrectos. Intente de nuevo'
          setTimeout(() => {
            this.failedLogin = ''
            this.user.username = ''
            this.user.password = ''
          }, 2000)
        }
      } catch {
        console.log('Error bringing users with get')
      }
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
