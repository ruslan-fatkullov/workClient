import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/index'
import Vuex from 'vuex'

const app = createApp(App)
app.use(router)
app.use(Vuex)
app.use(store)
app.mount('#app')

