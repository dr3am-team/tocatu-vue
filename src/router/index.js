import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import HomeView from '../views/HomeView.vue'
import RegisterView from '../views/RegisterView.vue'
import EventRegisterView from '../views/EventRegisterView.vue'
import EventListView from '../views/EventListView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/events',
      name: 'EventListView',
      component: EventListView
    },
    {
      path: '/login',
      name: 'Login',
      // component: () => import('../views/LoginView.vue')
      component: LoginView
    },
    {
      path: '/registrarse',
      name: 'Register',
      // component: () => import('../views/LoginView.vue')
      component: RegisterView
    },
    {
      path: '/',
      name: 'Home',
      // component: () => import('../views/HomeView.vue')
      component: HomeView
    },
    {
      path: '/registrar-evento',
      name: 'EventRegister',
      // component: () => import('../views/HomeView.vue')
      component: EventRegisterView
    }
  ]
})

export default router
