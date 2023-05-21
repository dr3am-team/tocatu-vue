<template>
  <div>
<<<<<<< HEAD
    <label for="account-type">Choose your fighter:</label>
    <select id="account-type" v-model="typeSelected" @click="select">
      <option disabled value="">Choose your fighter</option>
      <option v-for="type in accountType" :key="type.value" :value="type.value">
        {{ type.label }}
      </option>
    </select>

=======
    <label for="style">Username <input type="text" v-model="generalData.username" /></label>
    <label for="style">Mail <input type="mail" v-model="generalData.mail" /></label>
    <label for="style">Password <input type="password" v-model="generalData.password" /></label>

    <label for="account-type">Choose your fighter:</label>
    <select id="account-type" v-model="typeSelected" @click="select">
      <option selected disable hidden>Choose your fighter</option>
      <option v-for="type in accountType" :key="type.value" :value="type.value">
        {{ type.label }}
      </option>
    </select>

>>>>>>> 9feea53ef7af70da534bfa5eb8b8ee8759fef7b7
    <div v-if="typeSelected == 'band'">
      <label for="bandName">Name of your band <input type="text" v-model="band.name" /></label>
      <label for="style">Style of your band <input type="text" v-model="band.style" /></label>
    </div>

    <div v-if="typeSelected == 'bar'">
      <label for="barName">Name of your bar <input type="text" v-model="bar.name" /></label>
<<<<<<< HEAD
      <label for="style"> Location of your bar <input type="text" v-model="bar.location" /></label>
=======
      <label for="address"> Address of your bar <input type="text" v-model="bar.address" /></label>
      <label for="capacity">Capacity of your bar <input type="text" v-model="bar.capacity" /></label>
>>>>>>> 9feea53ef7af70da534bfa5eb8b8ee8759fef7b7
    </div>
    <button @click="register">Register</button>
  </div>
</template>

<script>
import Input from '../components/Input.vue'
export default {
<<<<<<< HEAD
  components: { Input },
=======
  components: {},
  mounted() {
    const usersLocalStorage = JSON.parse(window.localStorage.getItem('usuarios'))
    this.users = usersLocalStorage ?? [] //nullish coalesing
  },
>>>>>>> 9feea53ef7af70da534bfa5eb8b8ee8759fef7b7
  setup() {},
  data() {
    return {
      accountType: [
        { label: 'Band', value: 'band' },
        { label: 'Bar', value: 'bar' }
      ],
      typeSelected: '',
      band: { name: '', style: '' },
<<<<<<< HEAD
      bar: { name: '', location: '' }
=======
      bar: { name: '', address: '', capacity: null },
      generalData: { username: '', mail: '', password: '', userType: '' },
      users: []
>>>>>>> 9feea53ef7af70da534bfa5eb8b8ee8759fef7b7
    }
  },
  methods: {
    register() {
<<<<<<< HEAD
      //TODO
=======
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
>>>>>>> 9feea53ef7af70da534bfa5eb8b8ee8759fef7b7
    },
    select(e) {
      this.typeSelected = e.target.value
    }
  }
}
</script>

<style></style>
