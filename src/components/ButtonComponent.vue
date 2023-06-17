<template>
  <button :class="['button', buttonClass]">
    {{ label }}
  </button>
</template>

<script>
export default {
  name: 'ButtonComponent',
  props: {
    label: {
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

<style scoped lang="scss">
.button {
  margin-top: 10px;
  padding: 10px 15px;
  text-align: center;
  font-size: 16px;
  text-transform: uppercase;
  cursor: pointer;
  background: var(--cerulean);
  border: none;
  color: #fff;
  border-radius: 5px;

  &:hover {
    filter: brightness(1.2);
  }

  &.danger {
    background: red;
  }
}
</style>
