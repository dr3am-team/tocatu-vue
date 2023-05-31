<template>
  <div class="container">
    <label for="selector" class="select-label">{{ label }}</label>
    <select name="selector" id="selector" v-model="selectedOption" @change="emitSelected" class="select">
      <option v-for="option in array" :key="option.value" :value="option.value">{{ option.label }}</option>
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

<style scoped lang="scss">
.container {
  font-size: 16px;
  display: flex;
  flex-direction: column;
  width: 600px;
  margin: 0 auto;

  .select-label {
    display: flex;
    justify-content: space-between;
    .select {
      padding: 5px 10px;
      width: 70%;
      option {
        padding: 5px 0px;
      }
    }
  }
}
</style>
