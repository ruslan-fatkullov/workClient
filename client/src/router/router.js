import { createRouter, createWebHistory } from 'vue-router'


import UserAuthVue from '../components/UserAuth.vue'

const routes = [
  {
    path: '/',
    name: 'UserAuth',
    component: UserAuthVue
  },
  {
    path: '/login',
    name: 'UserSignUp',
    component: () => import('../components/UserSignUp.vue')
  },
  {
    path: '/forgotPassword',
    name: 'ForgotPassword',
    component: () => import('../components/ForgotPasswordComponent.vue')
  },
  {
    path: '/mainpage',
    name: 'MainPage',
    component: () => import('../components/MainPage.vue')
  },
  {
    path: '/changePassword',
    name: 'ChangePassword',
    component: () => import('../components/ChangePass.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
