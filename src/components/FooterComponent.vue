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
export default {
  data() {
    return {
      footerText: 'Copyright Tocatu Inc. 2023'
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
  background-color: lightblue;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.follow-us {
  margin-right: 200px;
}
i {
  margin-right: 30px;
  font-size: 30px;
}
</style>
