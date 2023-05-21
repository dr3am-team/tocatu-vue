<template>
  <div>
    <label for="style">Date <input type="date" v-model="event.date" /></label>
    <label for="style">Name <input type="text" v-model="event.name" /></label>
    <label for="style">Capacity <input type="number" v-model="event.capacity" /></label>
  </div>
  <button @click="register">Register</button>
</template>

<script>
export default {
  data() {
    return {
      event: {}
    }
  }
}
</script>

<style></style>
