<template>
  <div class="detailed-card">
    <div class="image-container">
      <img :src="imageUrl" alt="Image" class="image" />
    </div>
    <div class="content-container">
      <h1 class="title">{{ title }}</h1>
      <h2>Biografía</h2>
      <p class="description">{{ description }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailedCardComponent',
  components: {},
  props: {
    imageUrl: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    }
  }
}
</script>

<style>
.detailed-card {
  display: flex;
  align-items: flex-start;
}

.image-container {
  flex: 0 0 auto;
  margin-right: 20px;
}

.image {
  width: 100%;
  height: auto;
}

.content-container {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.title {
  font-size: 60px;
  margin-bottom: 10px;
}

.description {
  margin-top: 10px;
}
</style>
