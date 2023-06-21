<template>
  <footer>
    <div>
      <p>{{ footerText }}</p>
    </div>
    <div>
      <h4>Encontranos en:</h4>
      <div class="social-networks">
        <a href="https://www.linkedin.com/in/flerner/"><i class="fab fa-linkedin"></i></a>
        <a href="https://www.instagram.com/tocatuvue/"><i class="fab fa-instagram"></i></a>
        <a href="https://es-la.facebook.com/tocatu"><i class="fab fa-facebook"></i></a>
      </div>
    </div>
  </footer>
</template>

<script>
import dayjs from 'dayjs'
export default {
  data() {
    return {
      footerText: `Copyright Tocatu Inc. ${dayjs().year()}`
    }
  },
  mounted() {
    const script = document.createElement('script')
    script.src = 'https://kit.fontawesome.com/81d70dbb2a.js'
    script.crossOrigin = 'anonymous'
    document.body.appendChild(script)
  }
}
</script>

<style scoped>
footer {
  background-color: var(--prussian-blue);
  padding: 10px 25px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: white;
  min-height: 90px;
}

i {
  margin: 0.3em 0.5em;
  font-size: 2em;
  color: white;
  transition: all 0.2s;
}

i:hover{
  transform: scale(1.2);
}
</style>
