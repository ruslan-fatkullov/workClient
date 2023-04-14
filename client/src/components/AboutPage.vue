<template>
    <div class="about-page">
        <div class="container">
            <div class="row">
                <div class="col-md-6 content-block">Content</div>
                <div class="col-md-1"></div>
                <div class="col-md-5 user-data-field">
                    <div class="row">
                        <div class="col-md-4 label-icon-group">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor"
                                 class="bi bi-person" viewBox="0 0 16 16">
                                <path
                                        d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z"/>
                            </svg>
                            <p>Имя</p>
                        </div>
                        <div class="col-md-6">
                            <p>{{ firstName }}</p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-4 label-icon-group">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor"
                                 class="bi bi-person" viewBox="0 0 16 16">
                                <path
                                        d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z"/>
                            </svg>
                            <p>Фамилия</p>
                        </div>
                        <div class="col-md-6">
                            <p>{{ lastName }}</p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-4 label-icon-group">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor"
                                 class="bi bi-envelope" viewBox="0 0 16 16">
                                <path
                                        d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z"/>
                            </svg>
                            <p>email</p>
                        </div>
                        <div class="col-md-6">
                            <p>{{ email }}</p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="button-group">
                            <div class="change-pass-button" v-on:click="changePassword()">Поменять пароль</div>
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
import router from '../router/router'
import changePassword from "../components/ChangePass.vue"

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
            localStorage.removeItem("email")
            localStorage.removeItem("password")
            router.push({path: "/"})
        },
        changePassword() {
            this.changePass = true
        },
        closeForm() {
            this.changePass = false
        }
    },
    beforeMount() {
        axios.get(conf.SERVER_HOST + "/api/getUserByEmail", {params: {email: localStorage.getItem("email")}}, {
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
.content-block {
    padding: 10px;
    border: 1px solid rgb(0, 0, 255);
    border-radius: 5px;

}

.about-page {
    background-color: #212529;
    font-size: 20px;
    color: aliceblue;
}

.container {
    padding-top: 50px;
    align-content: end;
}

.user-data-field {
    border: 1px solid rgb(0, 0, 255);
    border-radius: 5px;

    padding: 30px;
}

.col-md-3 p {
    text-align: left;
}

.col-md-6 p {
    text-align: left;
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

.label-icon-group svg {
    margin-right: 15px;
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
</style>