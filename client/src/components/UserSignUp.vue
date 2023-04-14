<template>
    <form class="register-form" @submit.prevent="handleRegister()">
        <h2 v-if="hide_content">Регистрация пользователя</h2>
        <div v-if="hide_content" class="form-group">
            <label for="first-name">Имя:</label>
            <input v-model="firstName" type="text" class="form-control" id="first-name" name="first-name" required>
        </div>
        <div v-if="hide_content" class="form-group">
            <label for="last-name">Фамилия:</label>
            <input v-model="lastName" type="text" class="form-control" id="last-name" name="last-name" required>
        </div>
        <div v-if="hide_content" class="form-group">
            <label for="username">Логин:</label>
            <input v-model="email" type="text" class="form-control" id="username" name="username" required>
        </div>
        <div v-if="hide_content" class="form-group">
            <label for="password">Пароль:</label>
            <input v-model="password" type="password" class="form-control" id="password" name="password" required>
        </div>
        <div v-if="hide_content" class="form-group">
            <label for="confirm-password">Повторите пароль:</label>
            <input v-model="password_confirmation" type="password" class="form-control" id="confirm-password"
                name="confirm-password" required>
        </div>

        <div v-if="loading_content" class="spinner-wrapper">
            <div class="spinner"></div>
        </div>

        <div class="resultString">
            <p v-if="isActive">{{ resultString }}</p>
        </div>

        <div v-if="hide_content" class="form-group">
            <button type="submit" class="btn btn-primary">Зарегистрироваться</button>
        </div>
        <div class="already-register">
            <p class="login-link">Уже зарегистрированы?
                <router-link class="btn btn-link" to="/" exact>Войти</router-link>
            </p>
        </div>

    </form>
</template>

<script>
import store from "../store";
export default {
    data() {
        return {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            password_confirmation: '',

            resultString: '',
            isActive: true,
            loading_content: false,
            hide_content: true
        }
    },
    methods: {
        handleRegister() {
            this.loading_content = true
            setTimeout(() => {
                store.dispatch("registerUser", {
                    firstName: this.firstName,
                    lastName: this.lastName,
                    email: this.email,
                    password: this.password,
                    password_confirmation: this.password_confirmation
                }).then(() => {
                    this.loading_content = false
                    this.isActive = true;
                    this.resultString = store.getters.getRegResultString;
                }).catch(() => {
                    console.log("Ошибка")
                })
            }, 500)

        },

    }
}
</script>

<style scoped>
.spinner-wrapper {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    border-radius: 5px;
    background-color: #f2f2f2;
    opacity: 0.3;
}

.spinner {
    position: relative;
    height: 50px;
    width: 50px;
    margin: auto;
    top: 40%;
    border-left: 3px solid rgb(92, 47, 255);
    border-bottom: 3px solid rgb(92, 47, 255);
    border-right: 3px solid rgb(92, 47, 255);
    border-top: 3px solid transparent;
    border-radius: 50%;
    animation: spinner 1s linear infinite;
}

@keyframes spinner {

    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}

.register-form {
    position: relative;
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
    color: rgb(128, 122, 122);
}
.already-register{
    margin-top: 10px;
}
</style>