<template>
  <div class="card">
    <img :src="imageUrl" alt="Image" class="image" />
    <!-- <img
      src="https://images.pexels.com/photos/976866/pexels-photo-976866.jpeg?cs=srgb&dl=pexels-josh-sorenson-976866.jpg&fm=jpg"
      alt="Image"
      class="image"
    /> -->
    <div class="content">
      <div>
        <h3 class="title">{{ title }}</h3>
      </div>
      <div>
        <p class="fecha">{{ dateToLocalTime }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)
export default {
  name: 'CardComponent',
  components: {},
  props: {
    imageUrl: {
      type: String,
      required: true
      // default:
      //   'https://images.pexels.com/photos/976866/pexels-photo-976866.jpeg?cs=srgb&dl=pexels-josh-sorenson-976866.jpg&fm=jpg'
    },
    title: {
      type: String,
      required: true
    },
    date: {
      type: String,
      required: true
    }
  },

  computed: {
    dateToLocalTime() {
      return dayjs(this.date).utc().local().format('DD/MM/YY | H:mm')
    }
  }
}
</script>

<style scoped lang="scss">
.card {
  /* Styles for the card container */
  max-width: 300px;
  cursor: pointer;
  border: 2px solid var(--prussian-blue);
  border-radius: 5px;
  padding: 16px;
  transition: box-shadow 100ms ease-in-out;
  margin: 10px 0px;
  margin-right: 15px;
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
