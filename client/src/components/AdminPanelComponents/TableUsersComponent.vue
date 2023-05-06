<template>
    <div class="container">
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
    </div>
    <AlertWindowVue v-if="isActiveAlert" v-bind:alertMessage="alertMessage"></AlertWindowVue>

    <ConfirmDialogVue v-if="deleteDialog" v-bind:dialog-title="dialogTitle" @undoAction="undoDelete()"
        @confirmAction="deleteUser(userIdToDelete)">
    </ConfirmDialogVue>
</template>

<script>
import store from "../../store/index"
import ConfirmDialogVue from "../ConfirmDialog.vue"
import AlertWindowVue from "../../elements/AlertWidow.vue"
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

        }
    },
    beforeMount() {
        store.dispatch('getUsersAction').then(() => {
            this.users = store.getters.getUsers;
        })
    },
    mounted(){
        store.dispatch("setLinkListAction", [{label: "Главная", link:"/"},{label: "Панель администрирования", link:"/adminPanel"},{label: "Пользователи", link:""}])
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
            if (this.changeMode[this.users.indexOf(user)]) {
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
        },
    },
    components: {
        ConfirmDialogVue,
        AlertWindowVue
    }
}
</script>

<style scoped></style>