//import config from "@/config"

import config from "@/config"
import router from "@/router/router"
import axios from "axios"
import md5 from "md5";

//import axios from "axios"
export default {
    state: {
        authUser: {},
        loginStatus: "",
        loginResultMessage: ""
    },
    actions: {
        async loginUser(context, user) {
            context.commit('loginRequest')
            user.password = md5(user.password);
            await axios.post(config.SERVER_HOST + "/api/login", user).then((res) => {
                context.commit('setLoginResultMessage', res.data.message)
                if (res.data.statusCode == 200) {
                    context.commit('loginSuccess')
                    context.commit('setAuthUser', user)
                    localStorage.setItem('email', user.email);
                    localStorage.setItem('password', user.password)
                    router.push({ path: '/' })
                    return
                }
                if (res.data.statusCode == 201) {
                    context.commit('loginNotConfirmed')
                    return
                }
                context.commit('loginError')
            }).catch((err) => {
                return err
            })
        },
        async sendEmailConfirm(email) {
            console.log(email)
            axios.post(config.SERVER_HOST + "/api/sendLinkToMail", { params: { email: email } }).then(() => {

            }).catch((err) => {
                console.log(err)
            })
        }
    },
    mutations: {
        setAuthUser(state, user) {
            state.authUser = user
        },
        setLoginResultMessage(state, message) {
            state.loginResultMessage = message
        },

        loginRequest(state) {
            state.loginStatus = "loading"
        },
        loginSuccess(state) {
            state.loginStatus = "success"
        },
        loginError(state) {
            state.loginStatus = "error"
        },
        loginNotConfirmed(state) {
            state.loginStatus = "not confirmed"
        }
    },
    getters: {
        getLoginResultMessage: state => {
            return state.loginResultMessage
        },
        getLoginStatus: state => {
            return state.loginStatus
        },
    }
}