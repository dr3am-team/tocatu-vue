import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import HomeView from '../views/HomeView.vue'
import RegisterView from '../views/RegisterView.vue'
import EventRegisterView from '../views/EventRegisterView.vue'
import EventListView from '../views/EventListView.vue'
import DetailsView from '../views/DetailsView.vue'
import MyEventsView from '../views/MyEventsView.vue'

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
      component: LoginView
    },
    {
      path: '/registrarse',
      name: 'Register',
      component: RegisterView
    },
    {
      path: '/',
      name: 'Home',
      component: HomeView
    },
    {
      path: '/registrar-evento',
      name: 'EventRegister',
      component: EventRegisterView
    },
    {
      path: '/detalle/:id',
      name: 'DetailsView',
      component: DetailsView
    },
    {
      path: '/mis-eventos',
      name: 'MyEventsView',
      component: MyEventsView
    },
    {
      path: '/mis-eventos/editar/:id',
      name: 'EventRegisterEdit',
      component: () => import('../views/EventRegisterView.vue')
    },
    {
      path: '/perfil/editar/:id',
      name: 'ProfileEdit',
      component: () => import('../views/RegisterView.vue')
    }
  ]
})

export default router
