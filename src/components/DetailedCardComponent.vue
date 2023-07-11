<template>
  <div class="detailed-card">
    <img :src="`http://localhost:8080/public/${event.flyer}`" alt="Image" class="image" />
    <div class="content-container">
      <h1 class="title">{{ event.title }}</h1>
      <hr />
      <div class="info-container">
        <div class="where-when-price">
          <div class="where-when">
            <div class="where-container">
              <h4>¿Dónde?</h4>
              <p>Bar: {{ event.barName }}</p>
              <p>Dirección: {{ event.address }}</p>
            </div>
            <div class="when-container">
              <h4>¿Cuándo?</h4>
              <div class="when">
                <p>
                  Fecha: <br />
                  {{ setDate() }}
                </p>
                <p>
                  Hora: <br />
                  {{ setTime() }}hs
                </p>
              </div>
            </div>
          </div>
          <div class="price">
            <h2>Entrada: <br />${{ event.price }}</h2>
          </div>
        </div>
        <h4>Disponibilidad:</h4>
        <p class="capacity">
          Lugares disponibles: <b>{{ this.calculateSpotsAvailable() }}</b>
        </p>
        <p class="capacity">
          Capacidad máxima: <b>{{ event.capacity }}</b> espectadores.
        </p>
      </div>
    </div>
    <div></div>
  </div>
  <div class="description-container">
    <div class="description">
      <h2>Descripción del evento:</h2>
      <p>{{ event.description }}</p>
    </div>
  </div>
</template>

<!-- Details of the event -->

<script>
import dayjs from 'dayjs'
export default {
  name: 'DetailedCardComponent',
  components: {},
  props: {
    event: {
      type: Object,
      required: true
    }
  },
  methods: {
    calculateSpotsAvailable() {
      return this.event?.capacity - this.event?.viewersId?.length
    },
    setTime() {
      return dayjs(this.event.date).utc().local().format('HH:mm')
    },
    setDate() {
      return dayjs(this.event.date).utc().local().format('DD/MM/YYYY')
    }
  }
}
</script>
<style lang="scss" scoped>
.detailed-card {
  display: flex;
  justify-content: space-between;
  .image {
    width: 400px;
    object-fit: cover;
  }
  .content-container {
    display: flex;
    flex-direction: column;
    margin: 1em;
    width: 80%;
    .title {
      font-size: 60px;
      padding-bottom: 10px;
      text-transform: uppercase;
      text-align: center;
    }
    hr {
      // margin: 0 2em;
    }
    .info-container {
      margin: 1em;
      .capacity {
        margin: 1em 0;
      }
      .where-when-price {
        display: flex;
        margin-bottom: 2.5em;
        .where-when {
          display: flex;
          flex-direction: column;
          width: 50%;
          h4 {
            // text-align: center;
          }
          p {
            margin: 1em 0;
          }
          .when {
            display: flex;
            justify-content: space-between;
            p {
              // margin: 0.5em 1em;
            }
          }
        }
        .price {
          width: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          h2 {
            padding: 0.5em;
            border: solid 3px;
            border-radius: 15px;
          }
        }
      }
    }
  }
}
.description-container {
  display: flex;
  // margin: 2em;
  width: 600px;
  margin-top: 20px;
  .description {
    display: flex;
    flex-direction: column;
    p {
      // margin: 1em;
      text-align: justify;
      word-break: break-all;
      text-align: left;
    }
  }
}
</style>
