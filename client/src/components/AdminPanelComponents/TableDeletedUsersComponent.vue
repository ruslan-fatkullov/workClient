<template>
    <div class="container">
        <div class="table">
            <div class="head">
                <div class="row table-row">
                    <div class="col table-header">Имя</div>
                    <div class="col table-header">Фамилия</div>
                    <div class="col table-header">Email</div>
                    <div class="col table-header"></div>
                </div>
            </div>
            <div v-if="users.length !== 0" class="table-body">
                <div class="row table-row" v-for="user in users" :key="user.id">
                    <div class="col table-data">
                        <p>{{ user.firstName }}</p>
                    </div>
                    <div class="col table-data">
                        <p>{{ user.lastName }}</p>
                    </div>
                    <div class="col table-data">
                        <p>{{ user.email }}</p>
                    </div>
                    <div class="col table-data">

                        <div class="btn btn-success" @click="showDialog(user)">Восстановить</div>

                    </div>
                </div>
            </div>
            <div v-else class="emty-table">Пока нет записей</div>
        </div>
    </div>
    <AlertWindowVue v-if="isActiveAlert" v-bind:alertMessage="alertMessage"></AlertWindowVue>

    <ConfirmDialogVue v-if="recoverDialog" v-bind:dialog-title="dialogTitle" @undoAction="undoDelete()"
        @confirmAction="recoverUser(userToRecover)">
    </ConfirmDialogVue>
</template>

<script>
import store from "../../store/index"
import ConfirmDialogVue from "../ConfirmDialog.vue"
import AlertWindowVue from "../../elements/AlertWidow.vue"
export default {
    data() {
        return {
            users: "",
            isActiveUser: [],
            changeMode: [],
            isActiveAlert: false,
            alertMessage: "",
            recoverDialog: false,
            userToRecover: "",
            dialogTitle: "Вы уверены что хотите восстановить этого пользователя?",

        }
    },
    beforeMount() {
        store.dispatch('getDeletedUsersAction').then(() => {
            this.users = store.getters.getDeletedUsers;
        })
    },
    mounted() {
        store.dispatch("setLinkListAction", [{ label: "Главная", link: "/" }, { label: "Панель администрирования", link: "/adminPanel" }, { label: "Удаленные пользователи", link: "" }])
    },
    methods: {
        showDialog(user) {
            this.recoverDialog = true
            this.userToRecover = user
        },
        recoverUser(user) {
            this.recoverDialog = false
            store.dispatch("recoverUserAction", user).then(() => {
                this.users = store.getters.getDeletedUsers;
                this.isActiveAlert = true
                this.alertMessage = "Пользователь восстановлен"
                setTimeout(() => {
                    this.isActiveAlert = false
                    this.alertMessage = ""
                }, 2000)
            })
        },
        undoDelete() {
            this.recoverDialog = !this.recoverDialog
        }
    },
    components: {
        ConfirmDialogVue,
        AlertWindowVue
    }
}
</script>

<style scoped>
.emty-table {
    font-size: 32px;
}
</style>