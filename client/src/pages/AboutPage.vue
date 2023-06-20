<template>
    <div class="about-page">
        <div class="container-fluid">

            <div class="row justify-content-center main-container">
                <div class="col-lg-3"></div>
                <div class="col-xl-4 col-lg-5 col-md-8 col-sm-11 col-11 user-data-field">
                    <div class="user-data-header">
                        <p>Данные профиля</p>
                    </div>
                    <div class="label-input-group">
                        <div v-if="!editProfile" class="no-active-label">{{ firstName }}</div>
                        <input v-else type="text" v-model="firstName">
                        <div v-if="!editProfile" class="pre-logo user"></div>
                    </div>
                    <div class="label-input-group">
                        <div v-if="!editProfile" class="no-active-label">{{ lastName }}</div>
                        <input v-else type="text" v-model="lastName">
                        <div v-if="!editProfile" class="pre-logo user"></div>
                    </div>
                    <div class="label-input-group">
                        <div v-if="!editProfile" class="no-active-label">{{ email }}</div>
                        <input v-else type="text" v-model="email">
                        <div v-if="!editProfile" class="pre-logo eml"></div>
                    </div>
                    <div v-if="!editProfile" @click="changeMode()" class="edit-data-profile">
                        <p>Редактировать</p>
                        <div class="right-arrow"></div>
                    </div>
                    <div v-else class="confirm-undo-edit">
                        <div @click="replaceUserData()" class="confirm_edit">
                            <p>Сохранить</p>
                            <div class="confirm-label"></div>
                        </div>
                        <div @click="undoEdit()" class="undo_edit">
                            <div class="undo_edit_svg"></div>
                        </div>
                    </div>
                    <!--<div class="row justify-content-center button-group">
                        <div class="col-md-6">
                            <div class="main_button change-pass" v-on:click="changePassword()">Поменять пароль</div>
                        </div>
                        <div class="col-md-6">
                            <div class="exit-button" v-on:click="logout()">Выйти</div>
                        </div>
                    </div>-->
                </div>
                <div class="col-xl-4 col-lg-4 col-md-7 col-sm-10 col-xs-9 col-9">
                    <div class="side-panel">
                        <div v-on:click="changePassword()" class="panel-element">Поменять пароль</div>
                        <div v-on:click="showDialog = !showDialog" class="panel-element danger">Выйти</div>
                    </div>
                </div>

            </div>
        </div>
    </div>

    <ConfirmDialogVue v-if="showDialog" :dialogTitle="'Вы действительно хотите выйти?'"
        @undoAction="showDialog = !showDialog" @confirmAction="logout()"></ConfirmDialogVue>

    <changePassword @closeForm="closeForm()" v-if="changePass"></changePassword>
</template>

<script>
import ConfirmDialogVue from '../elements/ConfirmDialog.vue'
import axios from 'axios'
import conf from "../config"
import changePassword from "../components/ChangePass.vue"
import store from '../store'
import router from '../router/router'


export default {
    data() {
        return {
            firstName: "",
            lastName: "",
            email: "",
            tempFirstName: "",
            tempLastName: "",
            tempEmail: "",
            changePass: false,
            editProfile: false,
            buttonInfo: "Редактировать",
            showDialog: false,
        }
    },
    methods: {
        logout() {
            store.dispatch("logoutUser")
        },
        changePassword() {
            this.changePass = true
        },
        closeForm() {
            this.changePass = false
        },
        changeMode() {
            this.editProfile = !this.editProfile
            if (this.editProfile) {
                this.tempFirstName = this.firstName
                this.tempLastName = this.lastName
                this.tempEmail = this.email
            }
        },
        undoEdit() {
            this.editProfile = false
            this.firstName = this.tempFirstName
            this.lastName = this.tempLastName
            this.email = this.tempEmail
        },
        replaceUserData(){
            let user = {
                oldEmail: localStorage.getItem("email"),
                firstName: this.firstName,
                lastName: this.lastName,
                email: this.email
            }
            store.dispatch("replaceUserData", user)
        }
    },
    beforeCreate() {
        if (!localStorage.getItem("login_status")) {
            router.push("/")
        }
    },
    beforeMount() {
        store.dispatch("setLinkListAction", [{ label: "Главная", link: "/" }, { label: "Профиль", link: "/about" }])

        axios.get(conf.SERVER_HOST + "/api/getUserByEmail", { params: { email: localStorage.getItem("email") } }, {
            headers: {
                "Content-type": "application/json"
            }
        }).then((res) => {
            this.firstName = res.data.firstName
            this.lastName = res.data.lastName
            this.email = res.data.email
        })
    },
    components: {
        changePassword,
        ConfirmDialogVue
    }
}
</script>

<style scoped>
.pre-logo{
    position: absolute;
    top: 25%;
    left: 1rem;
    height: 22px;
    width: 22px;
}
.user{
    background: url('../assets/svg/user-03-svgrepo-com.svg') no-repeat;
}
.eml{
    background: url('../assets/svg/at-symbol-svgrepo-com.svg') no-repeat;
}
.container-fluid {
    padding: 0;
}

.side-panel {
    background-color: #d6d6d6;
    padding: 1rem 1rem 1rem 1rem;
    border-radius: 1rem;
    width: 100%;
}

.panel-element {
    border-radius: .5rem;
    height: 3.5rem;
    vertical-align: center;
    background-color: #ffffff;
    color: #878787;
    margin-top: .5rem;
}

.panel-element:hover {
    cursor: pointer;
    background-color: #f2f2f2;
}

.danger {
    color: red;
}

.main-container {
    margin: 0;
}

.group {
    position: relative;
    display: flex;
    flex-direction: column;
    outline: 1px solid black;
    border-radius: 5px;
    padding: .5rem;
    margin-top: 2rem;
}

.user-data-header {
    border-bottom: 3px solid rgb(80, 76, 76);
}

.group-label {
    position: absolute;
    left: 0;
    top: 8%;
    transform: translate(1em, -1em);
    background-color: #fff;
    border-radius: 10px;
    padding: 0 0.2rem;
}

.group-p {
    height: auto;
    margin-top: auto;
    margin-bottom: auto;
    padding: auto;
}

.about-page {
    font-family: 'Rostelecom Basic Light', Helvetica, Arial, sans-serif;
    font-size: 20px;
    color: aliceblue;
    background-color: #ffffff;
    padding-top: 1.5rem;
    padding-bottom: 1.5rem;
    border-top: 1px solid black;
}

.user-data-field {
    background-color: rgb(255, 255, 255);
    color: rgb(80, 76, 76);
    padding: 10px 50px;

}

.col-md-6 p {
    text-align: left;
    margin-left: 10px;
}


.change-pass-button {
    background-color: rgb(90, 90, 226);
    padding: 5px;
    border-radius: 5px;
    color: aliceblue;
}

.change-pass-button:hover {
    transition: 200ms transform;
    transform: scale(1.01);
    background-color: rgb(68, 68, 246);
    cursor: pointer;
}

.label-icon-group {
    display: flex;
}




.button-group {
    margin-top: 1rem;
}

.exit-button {
    background-color: rgb(227, 45, 42);
    padding: 5px;
    color: aliceblue;
    height: 100%;
}

.exit-button:hover {
    transition: 200ms transform;
    transform: scale(1.01);
    background-color: rgb(243, 20, 16);
    cursor: pointer;
}

.label_data_row {
    display: flex;
    justify-content: center;
    background-color: rebeccapurple;
}

.label_data_row p,
svg {
    width: auto;
}

.change-pass {
    font-size: 1rem;
}

.edit-data-profile {
    border-radius: 2.5rem;
    margin-top: 1rem;
    height: 3.5rem;
    line-height: 3.5rem;
    align-content: center;
    border: 1px solid;
    display: flex;
    justify-content: center;
    transition: all .3s ease;
}

.edit-data-profile:hover {
    cursor: pointer;
    background-color: #eeeeee;
}

.edit-data-profile:hover .right-arrow {
    transform: translate(10px);
}

.edit-data-profile p,
.right-arrow {
    white-space: nowrap;
    overflow: hidden;
}

.right-arrow {
    transition: all .3s ease;
    margin-left: 1rem;
    height: 32px;
    width: 32px;
    margin-top: auto;
    margin-bottom: auto;
    background: url('../assets/svg/arrow-right-svgrepo-com.svg') no-repeat;
}

.label-input-group {
    margin-top: 1rem;
    height: 3.4rem;
    line-height: 3.4rem;
    position: relative;
}

.no-active-label {
    border: 1px solid #b7b7b7;
    background-color: #e3e3e3;
    color: #878787;
    height: 100%;
    border-radius: .5rem;

    white-space: nowrap;
    overflow: hidden;
}

.label-input-group input {
    height: 100%;
    width: 100%;
    border-radius: .5rem;
    text-align: center;
    border: 1px solid;
}

.confirm-undo-edit {
    color: white;
    margin-top: 1rem;
    height: 3.5rem;
    line-height: 3.5rem;
    display: flex;
}

.confirm_edit {
    background: linear-gradient(to right, rgb(76, 237, 73), rgb(63, 231, 60));
    border-radius: 2.5rem 0 0 2.5rem;
    transition: all .2s ease;
    width: 80%;
    display: flex;
    justify-content: center;
}

.confirm_edit:hover {
    background: linear-gradient(to right, rgb(23, 220, 19), rgb(4, 255, 0));
    transform: scale(1.01) translate(-1px);
    cursor: pointer;
}

.confirm-label {
    transition: all .3s ease;
    margin-left: 1rem;
    height: 32px;
    width: 32px;
    margin-top: auto;
    margin-bottom: auto;
    background: url('../assets/svg/yes-svgrepo-com.svg') no-repeat;
}

.undo_edit {
    background-color: rgb(236, 76, 76);
    width: 20%;
    border-radius: 0 2.5rem 2.5rem 0;
    display: flex;
    justify-content: center;
    transition: all .2s ease;
}

.undo_edit:hover {
    cursor: pointer;
    background-color: rgb(253, 0, 0);
    transform: scale(1.01);
}

.undo_edit_svg {
    transition: all .3s ease;
    height: 20px;
    width: 20px;
    margin-top: auto;
    margin-bottom: auto;
    background: url('../assets/svg/cancel-svgrepo-com.svg') no-repeat;
}


@media only screen and (max-width : 400px) {

    .right-arrow {
        display: none;
    }
}</style>