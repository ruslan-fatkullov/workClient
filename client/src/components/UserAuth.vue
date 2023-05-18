<template>
    <form class="login-form" @submit.prevent="login()">
        <h2>{{ isLoginMode ? "Авторизация" : "Регистрация" }}</h2>
        <div v-if="!isLoginMode" class="form-group" :class="{ 'active_label_style': firstName }">
            <label for="first-name">Имя</label>
            <input v-model="firstName" type="text" class="form-control" id="first-name" name="first-name" required>
        </div>
        <div v-if="!isLoginMode" class="form-group" :class="{ 'active_label_style': lastName }">
            <label for="last-name">Фамилия</label>
            <input v-model="lastName" type="text" class="form-control" id="last-name" name="last-name" required>
        </div>
        <div class="form-group" :class="{ 'active_label_style': email }">
            <label for="email">Email</label>
            <input v-model="email" type="email" placeholder=" " class="form-control" id="email" name="email"
                :disabled="isRequest" required />
        </div>
        <div class="form-group" :class="{ 'active_label_style': password }">
            <label for="password">Пароль</label>
            <input v-model="password" type="password" class="form-control" id="password" name="password"
                :disabled="isRequest" required />
        </div>
        <div v-if="!isLoginMode" class="form-group" :class="{ 'active_label_style': password_confirmation }">
            <label for="confirm-password">Повторите пароль</label>
            <input v-model="password_confirmation" type="password" class="form-control" id="confirm-password"
                name="confirm-password" required>
        </div>
        <div class="resultString">
            <p v-if="isActiveResultString">{{ resultString }}</p>
        </div>
        <div v-if="loading" class="spinner-border" style="margin-bottom: 10px" role="status">
            <span class="sr-only"></span>
        </div>
        <button type="submit" class="main_button login_button" :disabled="isRequest">
            {{ isLoginMode ? "Войти" : "Зарегистрироваться" }}
        </button>
        <button v-if="sendEmailAgain" @click="sendEmailConfirmLink()" class="main_button login_button"
            style="margin-top: 5px;">
            Отправить ссылку на подтверждение повторно
        </button>
        <router-link v-if="isLoginMode" class="forgot-password" to="/forgotPassword" exact>Забыли пароль?</router-link>
        <div class="signup-link">
            {{ isLoginMode ? "Нет аккаунта?" : "Уже есть аккаунт?" }}
            <a class="" @click="changeMode()" exact>{{ isLoginMode ? "Зарегистрируйтесь" : "Войти" }}</a>
        </div>
    </form>
</template>

<script>
import store from "../store/index";

export default {
    data() {
        return {
            isLoginMode: true,


            firstName: '',
            lastName: '',
            email: "",
            password: "",
            password_confirmation: "",
            resultString: "",
            isActiveResultString: true,
            viewInput: true,
            sendEmailAgain: false,
            loading: false,
            isRequest: false,
        };
    },
    methods: {
        changeMode() {
            this.isLoginMode = !this.isLoginMode
        },
        login() {
            if (this.isLoginMode) {


                this.resultString = ""
                this.loading = true;
                this.isRequest = true;
                if (this.email === "" || this.password === "") {
                    this.loading = false;
                    this.isRequest = false;
                    this.resultString = "Заполните все поля";
                    this.isActive = true;
                    return;
                }
                store
                    .dispatch("loginUser", { email: this.email, password: this.password })
                    .then(() => {
                        this.isRequest = false;
                        this.resultString = store.getters.getLoginResultMessage;
                        this.loading = false;
                        if (store.getters.getLoginStatus === "not confirmed") {
                            this.sendEmailAgain = true;
                            this.viewInput = false;
                        }

                        store.dispatch("getUserByEmailAction")
                    });
            } else {
                this.loading = true
                store.dispatch("registerUser", {
                    firstName: this.firstName,
                    lastName: this.lastName,
                    email: this.email,
                    password: this.password,
                    password_confirmation: this.password_confirmation
                }).then(() => {
                    this.loading = false
                    this.isActive = true;
                    this.resultString = store.getters.getRegResultString;
                }).catch(() => {
                    console.log("Ошибка")
                })
            }
        },
        sendEmailConfirmLink() {
            store.dispatch("sendEmailConfirmLink", {
                email: this.email,
            }).then(() => {
                this.resultString = store.getters.getLoginResultMessage;
            })
        },
    },


};
</script>

<style scoped>
.login_button {
    width: 100%;
    padding: .4rem 0;
    font-size: 1.3rem;
    text-transform: capitalize;
    border: none;
}

.login-form {
    position: relative;
    font-family: 'Rostelecom Basic Light', Helvetica, Arial, sans-serif;
    width: 100%;
    max-width: 400px;
    margin: 20px auto;
    padding: 20px;
    border: 1px solid #f2f2f2;
    background-color: #f2f2f2;
    font-family: Arial, sans-serif;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.login-form h2 {
    font-family: 'Rostelecom Basic Light', Helvetica, Arial, sans-serif;
    margin: 1.5rem 0;
}
.form-group input {
    outline: 1px solid #075668;
}

.form-group input:focus {
    border-color: inherit;
    -webkit-box-shadow: none;
    box-shadow: none;
    outline: 1px solid #075668;
}

.form-group {
    margin-bottom: 10px;
    background-color: #fff;
    position: relative;
    display: flex;
    font-family: 'Rostelecom Basic Light', Helvetica, Arial, sans-serif;
}

.form-group label {
    position: absolute;
    color: #7b7b7b;
    margin-left: 15px;
    pointer-events: none;
    bottom: .7em;
    transition: all .2s ease;
    white-space: nowrap;
    max-width: 100%;
}

.active_label_style label {
    font-size: 95%;
    bottom: 2.5em;
    margin-left: 0;
    color: black;
    margin-left: 1rem;
    padding: 0 .6em;
    background-color: #fff;
    outline: 1px solid #075668;
    border-radius: .5rem;
}


.form-control {
    display: block;
    padding: 10px;
    line-height: 1.5;
    color: #333;
    border: none;
}







.forgot-password {
    display: block;
    margin-top: 20px;
    text-align: right;
    text-decoration: none;
    font-family: 'Rostelecom Basic Light', Helvetica, Arial, sans-serif;
    color: #0062cc;
}

.forgot-password:hover {
    text-decoration: underline;
    color: #007bff;
}

.signup-link {
    margin-top: 20px;
    font-family: 'Rostelecom Basic Light', Helvetica, Arial, sans-serif;
    text-align: center;
}

.signup-link a {
    color: #007bff;
    text-decoration: none;
}

.signup-link a:hover {
    cursor: pointer;
    text-decoration: underline;
}


@media only screen and (max-width : 1200px) {
    .login-form {
        font-size: 14px;
    }
}</style>