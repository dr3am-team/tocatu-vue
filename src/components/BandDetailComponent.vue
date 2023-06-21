<template>
    <div class="card">
      <div class="content">
        <img
          src="https://images.pexels.com/photos/995301/pexels-photo-995301.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt=""
        />
        <h4 class="title">{{ band.username }}</h4>
        <h4>Estilos:</h4>
        <p class="band-styles">{{ band.style }}</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'BandDetailComponent',
    components: {},
    props: {
      band: {
        type: Object,
        required: true
      }
    }
  }
  </script>
  
  <style scoped lang="scss">
  .card {
    width: 300px;
    height: auto;
    border: 2px solid #093347ff;
    border-radius: 5px;
    padding: 16px;
    transition: box-shadow 100ms ease-in-out;
    margin: 10px 0px;
    margin-right: 15px;
    &:hover {
      box-shadow: 0 2px 4px #093347ff;
    }
  }
  img {
    width: 100%;
    height: auto;
  }
  .title {
    font-size: 2em;
    margin-bottom: 8px;
    text-transform: capitalize;
    text-align: center;
  }
  .band-styles{
      text-transform: capitalize;
      margin: 1em;
  }
  </style>