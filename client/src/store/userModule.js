import axios from "axios"
//const md5 = require('md5')
export default {
    actions: {
        loginUser({ commit }, user) {
            return new Promise((resolve, reject) => {
                commit('auth_request')
                axios.post("http://localhost:8080/api/login", user, {
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
    mutations: {

    },
    state: {
        user: {}
    },
    getters: {

    }
}