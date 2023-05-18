<template>
  <div>
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

    <div v-if="typeSelected == 'band'">
      <label for="bandName">Name of your band <input type="text" v-model="band.name" /></label>
      <label for="style">Style of your band <input type="text" v-model="band.style" /></label>
    </div>

    <div v-if="typeSelected == 'bar'">
      <label for="barName">Name of your bar <input type="text" v-model="bar.name" /></label>
      <label for="address"> Address of your bar <input type="text" v-model="bar.address" /></label>
      <label for="capacity">Capacity of your bar <input type="text" v-model="bar.capacity" /></label>
    </div>
    <button @click="register">Register</button>
  </div>
</template>

<script>
export default {
  components: {},
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
