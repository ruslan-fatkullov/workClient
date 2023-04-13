import config from "@/config"
import axios from "axios"
export default {
    state: {
        users: [],
        alertMessage: ""
    },
    actions: {
        async getUsersAction(context) {
            let res = await axios.get(config.SERVER_HOST + "/api/getAllUser")
            res.data.users.forEach(element => {
                element.active = element.active ? true : false
            })
            context.commit('getAllUser', res.data.users);
        },
        async deleteUserAction(context, user) {
            await axios.delete(config.SERVER_HOST + "/api/deleteUser", { params: { id: user.id } }).then((res) => {
                if (res.status == 200) {
                    context.commit('deleteUser', user)
                }
            })
        },
        async updateUserAction(context, user) {
            await axios.put(config.SERVER_HOST + "/api/updateUser", user).then((res)=>{
                if (res.status == 200) {
                    context.commit('updateUser', user)
                }
            })
        }
    },
    mutations: {
        getAllUser(state, data) {
            state.users = data
        },
        deleteUser(state, user) {
            state.users = state.users.filter((us) => { return us != user });
        },
        updateUser() {

        }
    },

    getters: {
        getUsers: state => {
            return state.users
        },
        getAlertMessage: state => {
            return state.alertMessage
        }
    }
}