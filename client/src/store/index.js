
import Vuex from "vuex"
import user from './userModule'
import authModule from "./authModule"
import helpModule from "./helpModule"

export default new Vuex.Store({
    modules:{
        user,
        authModule,
        helpModule
    },

})