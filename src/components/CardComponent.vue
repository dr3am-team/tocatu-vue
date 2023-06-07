<template>
  <div class="card">
    <img :src="imageUrl" alt="Image" class="image" />
    <div class="content">
      <div>
        <h3 class="title">{{ title }}</h3>
      </div>
      <div>
        <p class="fecha">{{ fecha }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardComponent',
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
    fecha: {
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

<style scoped lang="scss">
.card {
  /* Styles for the card container */
  width: 300px;
  cursor: pointer;
  border: 2px solid var(--prussian-blue);
  border-radius: 4px;
  padding: 16px;
  margin: 2em;
  transition: box-shadow 100ms ease-in-out;

  &:hover {
    box-shadow: 0 2px 4px var(--prussian-blue);
  }
}

.image {
  /* Styles for the card image */
  width: 100%;
  height: auto;
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
