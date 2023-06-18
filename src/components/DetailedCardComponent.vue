<template>
  <div class="wrapper">
    <div class="detailed-card">
      <img class="image" :src="imageUrl" alt="Image" />

      <div class="content-container">
        <h1 class="title">{{ title }}</h1>
        <p class="description">{{ description }}</p>
      </div>
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

<style lang="scss" scoped>
.wrapper {
  display: grid;
  place-content: center;
  height: 100vh;
  .detailed-card {
    display: flex;
    justify-content: center;
    width: 70%;
    margin: 0 auto;

    .image {
      width: 400px;
      height: 600px;
      object-fit: cover;
    }

    .content-container {
      display: flex;
      flex-direction: column;
      margin-left: 15px;

      .title {
        font-size: 60px;
        margin-bottom: 10px;
      }

      .description {
        margin-top: 10px;
      }
    }
  }
}
</style>
