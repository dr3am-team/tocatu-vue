<template>
  <label for="">
    {{ this.label }}
    <input :type="this.type" />
  </label>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'number'
    },
    label: {
      type: String,
      default: 'Label'
    }
  }
}
</script>

<style></style>
