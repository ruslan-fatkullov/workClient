<template>
    <div class="container admin-panel">

        <div class="table">
            <div class="head">
                <div class="row table-row">
                    <div class="col table-header">Имя</div>
                    <div class="col table-header">Фамилия</div>
                    <div class="col table-header">Email</div>
                    <div class="col table-header">Верификация</div>
                    <div class="col table-header"></div>
                    <div class="col table-header"></div>
                </div>
            </div>
            <div class="table-body">
                <div class="row table-row" v-for="user in users" :key="user.id">
                    <div class="col table-data">
                        <input v-if="changeMode[users.indexOf(user)]" type="text" v-model=user.firstName>
                        <p v-else>{{ user.firstName }}</p>
                    </div>
                    <div class="col table-data">
                        <input v-if="changeMode[users.indexOf(user)]" type="text" v-model=user.lastName>
                        <p v-else>{{ user.lastName }}</p>
                    </div>
                    <div class="col table-data">
                        <input v-if="changeMode[users.indexOf(user)]" type="text" v-model=user.email>
                        <p v-else>{{ user.email }}</p>
                    </div>
                    <div class="col table-data">
                        <input v-if="changeMode[users.indexOf(user)]" type="checkbox" v-model=user.active>
                        <input v-else type="checkbox" v-model=user.active disabled>
                    </div>
                    <div class="col table-data">
                        <div id=user.id v-if="!changeMode[users.indexOf(user)]" class="btn btn-warning"
                            @click="changeUser(user)">Редактировать</div>
                        <div v-else class="btn btn-success" @click="changeUser(user)">Подтвердить</div>
                    </div>
                    <div class="col table-data">
                        <div v-if="changeMode[users.indexOf(user)]" @click="undoChange(users.indexOf(user))"
                            class="btn btn-danger">
                            Отменить</div>
                        <div v-else class="btn btn-danger" @click="setDeleteUser(user)">Удалить</div>
                    </div>
                </div>
            </div>




        </div>
        <div class="table">
            <div class="head">
                <div class="row table-row">
                    <div class="col table-header">Email</div>
                    <div class="col table-header">ФИО</div>
                    <div class="col table-header">Сообщение</div>
                </div>
            </div>

            <div class="table-body">
                <div class="row table-row" v-for="help in helps" :key="help.id">
                    <div class="col table-data">
                        <p>{{ help.email }}</p>
                    </div>
                    <div class="col table-data">
                        <p>{{ help.fullName }}</p>
                    </div>
                    <div class="col table-data">
                        <p>{{ help.message }}</p>
                    </div>

                </div>
            </div>
        </div>

        <div v-if="isActiveAlert" class="alert_window">{{ alertMessage }}</div>
        <ConfirmDialogVue v-if="deleteDialog" v-bind:dialog-title="dialogTitle" @undoAction="undoDelete()"
            @confirmAction="deleteUser(userIdToDelete)">
        </ConfirmDialogVue>

    </div>
</template>

<script>
import ConfirmDialogVue from './ConfirmDialog.vue'
import store from "../store/index"
export default {
    data() {
        return {
            users: [],
            isActiveUser: [],
            changeMode: [],
            isActiveAlert: false,
            alertMessage: "",
            deleteDialog: false,
            userIdToDelete: "",
            dialogTitle: "Вы уверены что хотите удалить этого пользователя?",

            helps: [],
        }
    },
    created() {
        // получение списка сообщений
        store.dispatch('getAllMessageAction').then(() => {
            this.helps = store.getters.getAllHelpMessage;
        })
        //
    },
    beforeMount() {
        // получение списка пользователей
        store.dispatch('getUsersAction').then(() => {
            this.users = store.getters.getUsers;
        })


    },
    mounted() {


    },
    methods: {
        deleteUser(user) {
            this.deleteDialog = false
            store.dispatch('deleteUserAction', user).then(() => {
                this.users = store.getters.getUsers;
                this.alertMessage = "Пользователь удален"
                this.isActiveAlert = true
            })
            setTimeout(() => {
                this.isActiveAlert = false
            }, 2000)
        },
        changeUser(user) {
            if (this.changeMode[this.users.indexOf(user)] == 1) {
                store.dispatch('updateUserAction', user).then(() => {
                    this.alertMessage = "Пользователь обновлен"
                    this.isActiveAlert = true
                })
                setTimeout(() => {
                    this.isActiveAlert = false
                }, 2000)
            }
            this.changeMode[this.users.indexOf(user)] = !this.changeMode[this.users.indexOf(user)]

        },
        undoDelete() {
            this.deleteDialog = !this.deleteDialog
        },
        setDeleteUser(userId) {
            this.userIdToDelete = userId
            this.deleteDialog = !this.deleteDialog
        },
        undoChange(userId) {
            this.changeMode[userId] = false
            store.dispatch('getUsersAction').then(() => {
                this.users = store.getters.getUsers
            })
        }
    },
    components: {
        ConfirmDialogVue,
    },



}
</script>

<style scoped>
.table {
    width: 100%;
    margin-bottom: 20px;
    border: 5px solid #fff;
    border-top: 5px solid #fff;
    border-bottom: 3px solid #fff;
    border-collapse: collapse;
    outline: 3px solid #37c748;
    font-size: 15px;
    background: #fff !important;
}

.table div.table-header {

    font-weight: bold;
    padding: 7px;
    padding-left: 20px;
    background: #37c748;
    border: none;
    text-align: left;
}

.table div.table-body {
    padding: 7px;
    border: none;
    border-top: 3px solid #fff;
    border-bottom: 3px solid #fff;
    text-align: left;
}

.table input[type='text'] {
    outline: none;
    size: auto;
    margin-left: 7px;
}

.table p {
    margin: 3px 10px;
}

.table input[type='checkbox']:hover {
    cursor: pointer;
}

.table input[type='checkbox'] {
    margin-left: 25%;
    content: "";
    display: block;
    width: 26px;
    height: 26px;
    border: 20px solid #555555;
    border-radius: 50%;
    background-color: white;
}

.table div.table-body .table-row:nth-child(even) {
    background: #f8f8f8 !important;
}

.table div.table-data {
    padding-left: 10px;
}

.table div.table-data p {
    width: auto;
    overflow-wrap: normal;
    word-wrap: normal;
    word-break: normal;
    line-break: auto;
    hyphens: manual;
}

.alert_window {
    display: block;
    position: absolute;
    padding: 10px;
    width: auto;
    left: 40%;
    top: 10%;
    border-radius: 20px;
    color: #000;
    background-color: rgb(223, 223, 40);
    animation: slideUp 2s ease infinite;
}

@keyframes slideUp {
    0% {
        opacity: 0;
        transform: translateY(0);
    }

    50% {
        opacity: 1;
        transform: translateY(10px);
    }

    100% {
        opacity: 0;
        transform: translateY(0);
    }
}
</style>