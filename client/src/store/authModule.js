import config from "@/config"
import router from "@/router/router"
import axios from "axios"
import md5 from "md5";

export default {
    state: {
        authUser: {},
        loginStatus: "",
        loginResultMessage: "",

        registerUser: {},
        regResultMessage: ""
    },
    actions: {
        async loginUser(context, user) {
            context.commit('loginRequest')
            user.password = md5(user.password);
            await axios.post(config.SERVER_HOST + "/api/login", user).then((res) => {
                context.commit('setLoginResultMessage', res.data.message)
                if (res.data.statusCode === 200) {
                    context.commit('loginSuccess')
                    context.commit('setAuthUser', user)
                    localStorage.setItem('email', user.email);
                    localStorage.setItem('password', user.password)
                    router.push({path: '/'})
                    return
                }
                if (res.data.statusCode === 201) {
                    context.commit('loginNotConfirmed')
                    return
                }
                context.commit('loginError')
            }).catch((err) => {
                return err
            })
        },
        async registerUser(context, user) {

            if (user.password_confirmation !== user.password) {
                context.commit("setRegResultMessage", "Пароли не совпадают")
                return;
            }
            if (user.firstName === '' || user.lastName === '' || user.email === '' || user.password === '' || user.password_confirmation === '') {
                context.commit("setRegResultMessage", "Заполните все поля")
                return;
            }
            user.password = md5(user.password)

            context.commit("setRegUser", user)
            axios.post(config.SERVER_HOST + "/api/signUp", user).then((res) => {
                context.commit('setRegResultMessage', res.data.message)
                if (res.data.statusCode === 200) {
                    router.push("/login")
                }
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
        setRegResultMessage(state, message) {
            state.regResultMessage = message
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
        },
        setRegUser(state, user) {
            state.registerUser = user
        }
    },
    getters: {
        getLoginResultMessage: state => {
            return state.loginResultMessage
        },
        getLoginStatus: state => {
            return state.loginStatus
        },
        getRegResultString: state => {
            return state.regResultMessage
        }
    }
}