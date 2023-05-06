import config from "@/config"
import router from "@/router/router"
import axios from "axios"
import md5 from "md5";

export default {
    state: {
        authUser: {}, //email password
        authUserInfo:{},// fullname email
        loginStatus: "", //success , not confirmed
        isAuth: true,
        loginResultMessage: "", // неверный пароль и.т.д


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

                    context.commit('setAuthBool', true)

                    localStorage.setItem('email', user.email);
                    localStorage.setItem('password', user.password)
                    localStorage.setItem('login_status', true)
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
            await axios.post(config.SERVER_HOST + "/api/signUp", user).then((res) => {
                context.commit('setRegResultMessage', res.data.message)
                if (res.data.statusCode === 200) {
                    
                    router.push("/login")
                }
            })

        },
        async getUserByEmailAction(context){
            await axios.get(config.SERVER_HOST + "/api/getUserByEmail", { params: { email: localStorage.getItem("email") } }, {
                headers: {
                    "Content-type": "application/json"
                }
            }).then((res) => {
                context.commit("setAuthUserInfo", res.data)
            })
        },
        logoutUser(context){
            localStorage.removeItem("email")
            localStorage.removeItem("password")
            localStorage.removeItem("login_status")
            context.commit("setAuthUserInfo", {})
            context.commit("setAuthUser", {})
            context.commit("setAuthBool", false)
            router.push({ path: "/" })
        },
        setAuthBoolAction(context){
            if(localStorage.getItem("login_status")){
               return context.commit("setAuthBool", true)
            }
            return context.commit("setAuthBool", false)
        }
    },
    mutations: {
        setAuthUserInfo(state, user){
            state.authUserInfo = user
        },
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
        },
        setAuthBool(state, value){
            state.isAuth = value
        }
    },
    getters: {
        getAuthUserInfo: state =>{
            return state.authUserInfo
        },
        getLoginResultMessage: state => {
            return state.loginResultMessage
        },
        getLoginStatus: state => {
            return state.loginStatus
        },
        getRegResultString: state => {
            return state.regResultMessage
        }, 
        getAuthBool: state => {
            return state.isAuth
        }
    }
}