<template>
    <div class="container">

        <div class="table">
            <div class="head">
                <div class="row table-row">
                    <div class="col-md-2 table-header">Email</div>
                    <div class="col-md-2 table-header">ФИО</div>
                    <div class="col table-header">Сообщение</div>
                    <div class="col-md-1 table-header"></div>
                </div>
            </div>

            <div class="table-body">
                <div @click="showDetail = true" class="row table-row" v-for="help in helps" :key="help.id">
                    <div class="col-md-2 table-data">
                        <p>{{ help.email }}</p>
                    </div>
                    <div class="col-md-2 table-data">
                        <p>{{ help.fullName }}</p>
                    </div>
                    <div class="col table-data">
                        <p>{{ help.message }}</p>
                    </div>

                    <div class="col-md-1 table-data column-delete">
                        <div class="delete-button" @click.stop="deleteHelpMessage(help)">
                            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor"
                                class="bi bi-trash" viewBox="0 0 16 16">
                                <path
                                    d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                <path fill-rule="evenodd"
                                    d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                            </svg>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
    <HelpMessageDetail v-if="showDetail" @closeDetailEmit="closeDetail()"></HelpMessageDetail>
</template>

<script>
import store from "@/store/index"
import HelpMessageDetail from "@/components/AdminPanelComponents/HelpMessageDetail.vue"
export default {
    data() {
        return {
            helps: [],
            isDetail: false,
            currentMessage: {},

            showDetail: false
        }
    },
    methods: {
        closeDetail(){
            this.showDetail = false
        },
        deleteHelpMessage(message) {
            store.dispatch('deleteMessageAction', message).then(() => {
                this.alertMessage = "Сообщение удалено"
                this.isActiveAlert = true
                this.helps = store.getters.getAllHelpMessage;
            })
            setTimeout(() => {
                this.isActiveAlert = false
            }, 2000)
        },
        detailMessage(mes) {
            this.isDetail = true
            this.currentMessage = mes
        },
    },
    mounted() {
        store.dispatch("setLinkListAction", [{ label: "Главная", link: "/" }, { label: "Панель администрирования", link: "/adminPanel" }, { label: "Cообщения", link: "" }])

        store.dispatch('getAllMessageAction').then(() => {
            this.helps = store.getters.getAllHelpMessage;
        })

    },
    components: {
        HelpMessageDetail
    }
}
</script>

<style scoped>
.column-delete {
    justify-content: end;
    display: flex;
}

.delete-button {
    margin-right: 20px;
    color: rgb(69, 64, 64);
}

.delete-button:hover {
    color: rgb(234, 53, 53);
}

.table-row:hover {
    cursor: pointer;
}

.show-detail {
    background-color: rgb(255, 255, 255);
    border-radius: 10px;
    border: 1px solid rgb(83, 75, 75);
    max-height: 400px;
    padding: 10px;
}

.show-detail span {
    text-align: left;
}

.message {
    text-align: justify;
}

.close_detail {
    margin: 15px 0;
    display: flex;
    justify-content: end;
}

.delete-button-detail {
    background-color: rgb(226, 91, 64);
    width: auto;
    padding: 5px;
    border-radius: 5px;
    color: white;
    margin-top: 10px;
}

.delete-button-detail:hover {
    background-color: rgb(237, 60, 24);
    cursor: pointer;
}

.table-data {
    height: 50px;
    white-space: nowrap;
    /* Запрещаем перенос строк */
    overflow: hidden;
    /* Обрезаем все, что не помещается в область */
    padding: 0 15px;
    /* Поля вокруг текста */
    text-overflow: ellipsis;
    /* Добавляем многоточие */

    background: linear-gradient(to left, transparent 0%, rgb(62, 59, 59) 5%, rgb(62, 59, 59) 100%);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
}</style>