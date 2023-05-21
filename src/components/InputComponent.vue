<template>
  <label for="">
    {{ label }}
    <input :value="modelValue" :type="type" @input="$emit('update:modelValue', $event.target.value)" />
  </label>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'text',
      required: true
    },
    label: {
      type: String,
      default: 'Label',
      required: true
    },
    modelValue: {
      type: String
    }
  },
  emits: ['update:modelValue']
}
</script>

<style></style>
