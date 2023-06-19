<template>
  <label :for="label">
    {{ label }}
    <input
      :type="type"
      :value="modelValue"
      @input="handleInput"
      :placeholder="placeholder"
      :min="type === 'datetime-local' ? this.date : null"
      :accept="type === 'file' ? fileTypes : null"
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
    },
    fileTypes: {
      type: String
    }
  },
  data() {
    return {
      date: dayjs().format('YYYY-MM-DD')
    }
  },

  methods: {
    handleInput(event) {
      if (this.type === 'file') {
        const files = event.target.files
        this.$emit('update:modelValue', files)
      } else {
        const value = event.target.value
        this.$emit('update:modelValue', value)
      }
    }
  }
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
