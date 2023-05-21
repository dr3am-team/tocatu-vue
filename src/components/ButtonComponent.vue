<template>
  <button :class="['button', buttonClass]">
    {{ buttonText }}
  </button>
</template>

<script>
export default {
  name: 'ButtonComponent',
  props: {
    buttonText: {
      type: String,
      required: true
    },
    buttonClass: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped>
.button {
  padding: 1rem 2.5rem;
  text-align: center;
  font-size: 16px;
  text-transform: uppercase;
  cursor: pointer;
  background: #ea4c89;
  border: none;
  color: #fff;
  font-weight: bold;
  letter-spacing: 1px;
  border-radius: 5px;
  box-shadow: 0px 4px 16px #e82d75;
}
.danger {
  background: red;
}
</style>
