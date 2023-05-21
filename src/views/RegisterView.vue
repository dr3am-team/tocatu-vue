<template>
  <div>
    <InputComponent type="text" v-model="generalData.username" label="Nombre de usuario" />
    <InputComponent type="text" v-model="generalData.mail" label="Mail" />
    <InputComponent type="password" v-model="generalData.password" label="Password" />
    <label for="account-type">Elegí el tipo de usuario:</label>
    <select id="account-type" v-model="typeSelected" @click="select">
      <option selected>Choose your fighter</option>
      <option v-for="type in accountType" :key="type.value" :value="type.value">
        {{ type.label }}
      </option>
    </select>

    <div v-if="typeSelected == 'band'">
      <InputComponent type="text" v-model="band.name" label="Nombre de tu banda" />
      <InputComponent type="text" v-model="band.style" label="Estilo de tu banda" />
    </div>

    <div v-if="typeSelected == 'bar'">
      <InputComponent type="text" v-model="bar.name" label="Nombre de tu bar" />
      <InputComponent type="text" v-model="bar.address" label="Dirección" />
      <InputComponent type="number" v-model="bar.capacity" label="Capacidad" />
    </div>
    <button-component @click="register" button-text="Registrarse" button-class="danger"></button-component>
  </div>
</template>

<script>
import ButtonComponent from '../components/ButtonComponent.vue'
import InputComponent from '../components/InputComponent.vue'
export default {
  components: { InputComponent, ButtonComponent },
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
      users: []
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
      console.log(data)
      this.users.push(data)

      //Override localstorage info
      const datosEnString = JSON.stringify(this.users, null, '\t')
      window.localStorage.setItem('usuarios', datosEnString)
    },
    select(e) {
      this.typeSelected = e.target.value
    }
  }
}
</script>

<style></style>
