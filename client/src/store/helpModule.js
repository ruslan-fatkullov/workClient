import config from "@/config"
import axios from "axios"

export default {
    state: {
        helpMessages: [],

    },
    actions: {
        async getAllMessageAction(context) {
            await axios.get(config.SERVER_HOST + "/help/getAllHelpMessage").then((res) => {
                context.commit("getAllHelpMessageMutation", res.data.helpList)
            })
        },
        async sendMessageAction(context, helpMessage) {
            await axios.post(config.SERVER_HOST + "/help/sendHelpMessage", helpMessage).then(res => {
                if (res.data.statusCode === 400) {
                    return
                }
                context.commit("setNewHelpMessage", helpMessage)
            })
        },
        async deleteMessageAction(context, helpMessage) {
            console.log(helpMessage)
            await axios.post(config.SERVER_HOST + "/help/deleteHelpMessage",helpMessage).then(res => {
                if (res.data.statusCode === 400) {
                    console.log(res.data.message)
                    return
                }
                context.commit("deleteHelpMessage", helpMessage)
                console.log(res.data.message)
            })
        }
    },
    mutations: {
        getAllHelpMessageMutation(state, messages) {
            state.helpMessages = messages
        },
        setNewHelpMessage(state, helpMessage) {
            state.helpMessages.push(helpMessage)
        },
        deleteHelpMessage(state, helpMessage){
            state.helpMessages = state.helpMessages.filter((hm) => { return hm !== helpMessage });
        }
    },
    getters: {
        getAllHelpMessage: state => {
            return state.helpMessages
        }
    }
}