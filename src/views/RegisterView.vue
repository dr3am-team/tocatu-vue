<template>
  <form class="container">
    <InputComponent type="text" v-model="generalData.username" label="Nombre de usuario" />
    <InputComponent type="text" v-model="generalData.mail" label="Mail" placeholder="usuario@usuario.com" />
    <InputComponent type="password" v-model="generalData.password" label="Password" />

    <SelectorComponent :array="accountType" v-model="typeSelected" label="Tipo de usuario" @selected="select" />

    <div v-if="typeSelected == 'band'" class="container">
      <InputComponent type="text" v-model="band.name" label="Nombre de tu banda" />
      <!-- <InputComponent type="text" v-model="band.style" label="Estilo de tu banda" /> -->
      <SelectorComponent :array="styles" v-model="band.style" label="Selecciona un estilo" @selected="handleSelected" />
    </div>

    <div v-if="typeSelected == 'bar'">
      <InputComponent type="text" v-model="bar.name" label="Nombre de tu bar" />
      <InputComponent type="text" v-model="bar.address" label="Dirección" />
      <InputComponent type="number" v-model="bar.capacity" label="Capacidad" />
    </div>

    <ButtonComponent @click.prevent="register" buttonText="Registrarse" customStyle="20px" />
  </form>
</template>

<script>
import ButtonComponent from '../components/ButtonComponent.vue'
import InputComponent from '../components/InputComponent.vue'
import SelectorComponent from '../components/SelectorComponent.vue'
export default {
  components: { InputComponent, ButtonComponent, SelectorComponent },
  mounted() {
    const usersLocalStorage = JSON.parse(window.localStorage.getItem('usuarios'))
    this.users = usersLocalStorage ?? [] //nullish coalesing
  },
  setup() {},
  data() {
    return {
      accountType: [
        { label: 'Band', value: 'band' },
        { label: 'Bar', value: 'bar' }
      ],
      typeSelected: '',
      band: { name: '', style: '' },
      bar: { name: '', address: '', capacity: null },
      generalData: { username: '', mail: '', password: '', userType: '' },
      users: [],
      styles: [
        { value: 'rock', label: 'Rock' },
        { value: 'jazz', label: 'Jazz' }
      ]
    }
  },
  methods: {
    register() {
      this.generalData.userType = this.typeSelected
      const data = {
        ...this.generalData,
        ...(this.typeSelected == 'band' && { ...this.band }),
        ...(this.typeSelected == 'bar' && { ...this.bar })
      }
      this.users.push(data)

      //Override localstorage info
      const datosEnString = JSON.stringify(this.users, null, '\t')
      window.localStorage.setItem('usuarios', datosEnString)
      this.$router.push('/login')
    },
    select(e) {
      console.log(e)
      this.typeSelected = e
    },
    handleSelected(selected) {
      this.band.style = selected
      console.log(selected)
    }
  }
}
</script>

<style scoped lang="scss">
.container {
  font-size: 16px;
  display: flex;
  flex-direction: column;
  width: 600px;
  margin: 0 auto;

  .select-label {
    display: flex;
    justify-content: space-between;
    .select {
      padding: 5px 10px;
      width: 70%;
      option {
        padding: 5px 0px;
      }
    }
  }
}
</style>
