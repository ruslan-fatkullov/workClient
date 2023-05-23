<template>
    <div class="about-page">
        <div class="container">

            <div class="row justify-content-center">
                <div class="col-md-4 user-data-field">
                    <div class="row justify-content-center">
                        <div class="col-md-12 group">
                            <label for="firstName" class="group-label">Имя</label>
                            <p id="firstName group_p">{{ firstName }}</p>
                        </div>
                    </div>
                    <div class="row justify-content-center">

                        <div class="col-md-12 group">
                            <label for="lastName" class="group-label">Фамилия</label>
                            <p id="lastName">{{ lastName }}</p>
                        </div>
                    </div>
                    <div class="row justify-content-center">

                        <div class="col-md-12 group">
                            <label for="email" class="group-label">Email</label>
                            <p id="email">{{ email }}</p>
                        </div>
                    </div>
                    <div class="row justify-content-center button-group">
                        <div class="col-md-6">
                            <div class="main_button change-pass" v-on:click="changePassword()">Поменять пароль</div>
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

.group{
    position: relative;
    display: flex;
    flex-direction: column;
    outline: 1px solid black;
    border-radius: 5px;
    padding: .5rem;
    margin-top: 2rem;
}
.group-label{
    position: absolute;
    left: 0;
    top: 0;
    transform: translate(1em, -1em);
    background-color: #fff;
    outline: 1px solid black;
    border-radius: 10px;
    padding: 0 0.8rem;
}
.group-p{
    height: auto;
    margin-top: auto;
    margin-bottom: auto;
    padding: auto;
}
.about-page {
    font-family: 'Rostelecom Basic Light', Helvetica, Arial, sans-serif;
    font-size: 20px;
    color: aliceblue;
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
}

.user-data-field {
    background-color: rgb(255, 255, 255);
    color: rgb(80, 76, 76);
    padding: 10px 50px;
    outline: 3px solid #075668;

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

.button-group div {
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
.change-pass{
    font-size: 1rem;
}
</style>