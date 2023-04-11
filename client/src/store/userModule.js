import axios from "axios"
import config from "@/config"
//const md5 = require('md5')
export default {
    actions: {
        
    },
    mutations: {
        loginUser({ commit }, user) {
            return new Promise((resolve, reject) => {
                commit('auth_request')
                axios.post(config.SERVER_HOST + "/api/login", user, {
                    headers: {
                        "Content-type": "application/json"
                    }
                }).then((res) => {
                    resolve(res)
                }).catch((err) => {
                    console.log(err)
                    reject(err)
                })
            })
        }
    },
    state: {
        user: {
            firstName: "",
            lastName: "",
            email: "",
        }
    },
    getters: {

    }
}