<template>
    <div class="about-page">
        <div class="container">

            <div class="row justify-content-center">
                <div class="col-md-8 user-data-field">
                    <div class="row">
                        <div class="col-md-6 label-icon-group">
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor"
                                class="bi bi-person" viewBox="0 0 16 16">
                                <path
                                    d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z" />
                            </svg>
                            <p class="sad">Имя</p>
                        </div>
                        <div class="col-md-6">
                            <p>{{ firstName }}</p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6 label-icon-group">
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor"
                                class="bi bi-person" viewBox="0 0 16 16">
                                <path
                                    d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z" />
                            </svg>
                            <p>Фамилия</p>
                        </div>
                        <div class="col-md-6">
                            <p>{{ lastName }}</p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6 label-icon-group">
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor"
                                class="bi bi-envelope" viewBox="0 0 16 16">
                                <path
                                    d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z" />
                            </svg>
                            <p>email</p>
                        </div>
                        <div class="col-md-6">
                            <p>{{ email }}</p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="change-pass-button" v-on:click="changePassword()">Поменять пароль</div>
                        </div>
                        <div class="col-md-6">
                            <div class="exit-button" v-on:click="logout()">Выйти</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <changePassword @closeForm="closeForm()" v-if="changePass"></changePassword>
</template>

<script>
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
            changePass: false
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
    }
}
</script>

<style scoped>
.about-page {
    font-family: 'Rostelecom Basic Light', Helvetica, Arial, sans-serif;
    font-size: 20px;
    color: aliceblue;
    margin-top: 1.5rem;
}

.user-data-field {
    background-color: rgb(255, 255, 255);
    color: rgb(80, 76, 76);
    padding: 50px 100px;

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
    display: flex;
}

.button-group div {
    margin-right: 15px;
    padding: 10px 25px;
}

.exit-button {
    background-color: rgb(227, 45, 42);
    padding: 5px;
    border-radius: 5px;
    color: aliceblue;
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
</style>