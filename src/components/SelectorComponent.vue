<template>
  <div>
    <label for="selector">{{ label }}</label>
    <select name="selector" id="selector" v-model="selectedOption" @change="emitSelected">
      <option v-for="option in array" :key="option.value">{{ option.label }}</option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'SelectorComponent',
  data() {
    return {
      selectedOption: ''
    }
  },
  props: {
    array: {
      type: Array,
      required: true
    },
    label: {
      type: String,
      required: true
    }
  },
  methods: {
    emitSelected() {
      this.$emit('selected', this.selectedOption)
    }
  }
}
</script>

<style></style>
