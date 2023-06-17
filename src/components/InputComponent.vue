<template>
  <label :for="label">
    {{ label }}

    <input
      :value="modelValue"
      :type="type"
      @input="$emit('update:modelValue', $event.target.value)"
      :placeholder="placeholder"
      :min="type === 'date' ? this.date : null"
    />
  </label>
</template>

<script>
import dayjs from 'dayjs'
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
    placeholder: {
      type: String
    },
    modelValue: {
      type: String
    }
  },
  data() {
    return {
      date: dayjs().format('YYYY-MM-DD')
    }
  },

  emits: ['update:modelValue']
}
</script>

<style scoped lang="scss">
label {
  display: flex;
  justify-content: space-between;
  margin: 10px 0px;
  width: 100%;
  input {
    padding: 5px 10px;
    width: 70%;
  }
}
</style>
