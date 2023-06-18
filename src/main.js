import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Vue3Toasity from 'vue3-toastify'

import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(Vue3Toasity, {
  autoClose: 2000
})
app.use(createPinia())
app.use(router)
app.mount('#app')
