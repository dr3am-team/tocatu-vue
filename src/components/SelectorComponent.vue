<template>
  <div class="container">
    <label for="selector" class="select-label"
      >{{ label }}
      <select name="selector" id="selector" v-model="selectedOption" @change="emitSelected" class="select">
        <option v-for="option in array" :key="option.value" :value="option.value">{{ option.label }}</option>
      </select>
    </label>
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
      type: Array
    },
    label: {
      type: String
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
  display: flex;
  justify-content: space-between;
  flex-grow: 0;
  font-size: 16px;
  margin: 0 auto;

  .select-label {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .select {
      padding: 5px 10px;
      height: 30px;
      width: 70%;
    }
  }
}
</style>
