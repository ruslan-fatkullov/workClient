
export default {
    state: {
        linkList: []
    },
    actions: {
        setLinkListAction(context, list){
            context.commit('setLinkList', list)
        },
    },
    mutations: {
        setLinkList(state, list){
            state.linkList = list
        },
    },
    getters: {
        getLinkList: state => {
            return state.linkList
        }
    }
}