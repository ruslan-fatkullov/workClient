import config from "@/config"
import axios from "axios"

export default{
    state: {
        helpMessages: [

        ]
    },
    actions: {
        getAllMessageAction(context){
            axios.get(config.SERVER_HOST+"/help/getAllHelpMessage").then((res)=>{
                context.commit("getAllHelpMessageMutation", res.data.helpList)
            })
        },
        sendMessageAction(user){
            axios.post(config.SERVER_HOST+"/help/sendHelpMessage", user)
        }
    },
    mutations: {
        getAllHelpMessageMutation(state, messages){
            state.helpMessages = messages
        }
    },
    getters: {
        getAllHelpMessage: state => {
            return state.helpMessages
        }
    }
}