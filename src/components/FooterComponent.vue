<template>
  <footer>
    <p>{{ footerText }}</p>
    <div class="follow-us">
      <h2>Seguinos</h2>
      <a href="https://www.linkedin.com/in/flerner/"><i class="fab fa-linkedin"></i></a>
      <a href="https://www.instagram.com/tocatuvue/"><i class="fab fa-instagram"></i></a>
      <a href="https://es-la.facebook.com/tocatu"><i class="fab fa-facebook"></i></a>
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
  justify-content: space-between;
  align-items: center;
  color: white;
}

i {
  margin-right: 30px;
  font-size: 20px;
  color: white;
}
</style>
