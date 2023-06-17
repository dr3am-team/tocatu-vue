<template>
  <NavbarComponent></NavbarComponent>

  <div class="super-container">
    <div class="container">
      <SelectorComponent :array="accountType" v-model="typeSelected" label="Tipo de usuario" @selected="select" />
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
import SelectorComponent from '../components/SelectorComponent.vue'
import NavbarComponent from '../components/NavbarComponent.vue'

export default {
  components: { ButtonComponent, InputComponent, NavbarComponent, FooterComponent, SelectorComponent },
  setup() {
    const { loginStore } = useLoginStore()
    return { loginStore }
  },
  data() {
    return {
      user: { username: '', password: '' },
      failedLogin: '',

      accountType: [
        { label: 'Banda', value: 'band' },
        { label: 'Bar', value: 'bar' }
      ],
      typeSelected: ''
    }
  },
  methods: {
    async login() {
      //Input of user and passw
      const { username, password } = this.user

      //Bring users from local storage
      //const users = JSON.parse(window.localStorage.getItem('usuarios'))
      console.log(this.typeSelected)
      try {
        const bar = await barsService.loginBar(this.user)
        console.log(this.typeSelected)
        if (bar) {
          this.loginStore({ bar, permissions: [bar.userType] })
          this.$router.push('/')
        }
      } catch (error) {
        this.failedLogin = error.response.data.message
      }
      // console.log(users)
    },
    handleKeyPress() {
      this.login()
    },
    select(e) {
      this.typeSelected = e
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
