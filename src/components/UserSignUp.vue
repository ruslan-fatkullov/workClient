<template>
    <form class="register-form" @submit.prevent="handleRegister()">
        <h2>Регистрация пользователя</h2>
        <div class="form-group">
            <label for="first-name">Имя:</label>
            <input v-model="firstName" type="text" class="form-control" id="first-name" name="first-name" required>
        </div>
        <div class="form-group">
            <label for="last-name">Фамилия:</label>
            <input v-model="secondName" type="text" class="form-control" id="last-name" name="last-name" required>
        </div>
        <div class="form-group">
            <label for="username">Логин:</label>
            <input v-model="email" type="text" class="form-control" id="username" name="username" required>
        </div>
        <div class="form-group">
            <label for="password">Пароль:</label>
            <input v-model="password" type="password" class="form-control" id="password" name="password" required>
        </div>
        <div class="form-group">
            <label for="confirm-password">Повторите пароль:</label>
            <input v-model="password_confirmation" type="password" class="form-control" id="confirm-password"
                name="confirm-password" required>
        </div>
        <div class="resultString">
            <p v-if="isActive">{{ resultString }}</p>
        </div>
        <div class="form-group">
            <button type="submit" class="btn btn-primary">Зарегистрироваться</button>
        </div>
        <p class="login-link">Уже зарегистрированы?
            <router-link class="btn btn-secondary" to="/" exact>Войти</router-link>
        </p>
    </form>
</template>

<script>
import axios from "axios"
import router from "../router/router.js"
const md5 = require('md5')
export default {
    data() {
        return {
            firstName: '',
            secondName: '',
            email: '',
            password: '',
            password_confirmation: '',

            resultString: '',
            isActive: true
        }
    },
    methods: {
        handleRegister() {
            if (this.password_confirmation !== this.password) {
                this.resultString = "Пароли не совпадают";
                this.isActive = true;
                return;
            }
            if (this.firstName == '' || this.secondName == '' || this.email == '' || this.password == '' || this.password_confirmation == '') {
                this.resultString = "Заполните все поля";
                this.isActive = true;
                return;
            }

            const hashPssword = md5(this.password);
            const newUser = {
                firstName: this.firstName,
                lastName: this.secondName,
                email: this.email,
                password: hashPssword,
            }

            axios.post("http://localhost:8080/api/signUp", newUser, {
                headers: {
                    "Content-type": "application/json"
                }
            }).then((res) => {
                this.resultString = res.data.message

                let ResultStringElement = document.querySelector('.resultString p');
                if (res.data.statusCode == 200) {
                    ResultStringElement.style.color = 'green';
                    router.push('/login');
                } else {
                    ResultStringElement.style.color = 'red';
                }

            }).catch((err) => {
                console.log(err)
            })


        }
    }
}
</script>

<style>
.register-form {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #f2f2f2;
    border-radius: 5px;
    background-color: #f2f2f2;
    font-family: Arial, sans-serif;
}

.register-form h2 {
    text-align: center;
    margin-bottom: 20px;
    font-size: 24px;
}

.resultString p {
    color: red;
}
</style>