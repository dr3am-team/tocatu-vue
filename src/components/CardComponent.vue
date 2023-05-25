<template>
  <div class="card">
    <img :src="imageUrl" alt="Image" class="image" />
    <div class="content">
      <h3 class="title">{{ title }}</h3>
      <p class="text">{{ text }}</p>
      <ButtonComponent label="Unirme" />
    </div>
  </div>
</template>

<script>
import ButtonComponent from './ButtonComponent.vue'

export default {
  name: 'CardComponent',
  components: { ButtonComponent },
  props: {
    imageUrl: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    },
    buttonText: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
.card {
  /* Styles for the card container */
  width: 300px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.image {
  /* Styles for the card image */
  width: 100%;
  height: auto;
  margin-bottom: 16px;
}

.title {
  /* Styles for the card title */
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 8px;
}

.text {
  /* Styles for the card text */
  margin-bottom: 16px;
}
</style>
