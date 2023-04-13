
import Vuex from "vuex"
import user from './userModule'
import authModule from "./authModule"

export default new Vuex.Store({
    modules:{
        user,
        authModule
    },

})