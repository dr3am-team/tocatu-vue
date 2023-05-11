import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/login',
      name: 'Login',
      // component: () => import('../views/LoginView.vue')
      component: LoginView
    },
    {
      path: '/',
      name: 'Home',
      // component: () => import('../views/HomeView.vue')
      component: HomeView
      
    }
  ]
})

export default router
