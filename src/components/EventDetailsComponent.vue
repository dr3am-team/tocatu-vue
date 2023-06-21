<template>
  <div class="detailed-card">
    <!-- TODO - usar la imagen del evento -->
    <img
      class="image"
      src="https://images.unsplash.com/photo-1526478806334-5fd488fcaabc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1516&q=80"
      alt="Image"
    />

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
                  {{ date }}
                </p>
                <p>
                  Hora: <br />
                  {{ time }}hs
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
          Lugares disponibles: <b>{{ calculateSpotsAvailable() }}</b>
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
  name: 'EventDetailsComponent',
  components: {},
  props: {
    event: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      date: dayjs(this.event.date).format('DD/MM/YYYY'),
      time: dayjs(this.event.date).format('HH:mm')
    }
  },
  methods:{
    calculateSpotsAvailable() {
      return this.event?.capacity - this.event?.viewersId?.length
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
      margin: 0 2em;
    }

    .info-container {
      margin: 1em;

      .capacity{
        margin: 1em 0 ;
      }

      .where-when-price {
        display: flex;
        margin-bottom: 2.5em;

        .where-when {
          display: flex;
          flex-direction: column;
          width: 50%;

          h4 {
            text-align: center;
          }

          p {
            margin: 1em 0;
          }

          .when {
            display: flex;
            justify-content: space-between;

            p {
              margin: 0.5em 1em;
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
  margin: 2em;

  .description {
    display: flex;
    flex-direction: column;

    p{
      margin: 1em;
      text-align: justify;
    }
  }
}
</style>
