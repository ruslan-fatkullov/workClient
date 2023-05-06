import { createRouter, createWebHistory } from 'vue-router'


const routes = [
  {
    path: '/login',
    name: 'UserAuth',
    component: () => import('../components/AuthentificationComponents/UserAuth.vue')
  },
  {
    path: '/forgotPassword',
    name: 'ForgotPassword',
    component: () => import('../components/ForgotPasswordComponent.vue')
  },
  {
    path: '/registration',
    name: 'UserSignUp',
    component: () => import('../components/AuthentificationComponents/UserSignUp.vue')
  },

  {
    path: '/about',
    name: 'AboutPage',
    component: () => import('../pages/AboutPage.vue')
  },
  {
    path: '/changePassword',
    name: 'ChangePassword',
    component: () => import('../components/ChangePass.vue')
  },
  {
    path: '/',
    name: 'MainPage',
    component: () => import('../pages/MainPage.vue')
  },
  {
    path: '/adminPanel',
    name: 'AdminPanel',
    component: () => import('../pages/AdminPanelPage.vue')
  },
  {
    path: '/techSupport',
    name: 'TechnicalSupportPage',
    component: () => import('../pages/TechnicalSupportPage.vue')
  },
  {
    path: '/downloadProjects',
    name: 'DownloadProjectsPage',
    component: () => import('../pages/DownloadProjectsPage.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
