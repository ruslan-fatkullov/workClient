import { createRouter, createWebHistory } from 'vue-router'


const routes = [
  {
    path: '/login',
    name: 'UserAuth',
    component: () => import('../components/UserAuth.vue')
  },
  {
    path: '/forgotPassword',
    name: 'ForgotPassword',
    component: () => import('../components/ForgotPasswordComponent.vue')
  },
  {
    path: '/registration',
    name: 'UserSignUp',
    component: () => import('../components/UserSignUp.vue')
  },

  {
    path: '/about',
    name: 'AboutPage',
    component: () => import('../components/AboutPage.vue')
  },
  {
    path: '/changePassword',
    name: 'ChangePassword',
    component: () => import('../components/ChangePass.vue')
  },
  {
    path: '/',
    name: 'MainPage',
    component: () => import('../components/MainPage.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
