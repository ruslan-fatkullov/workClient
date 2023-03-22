<template>
  <form class="login-form" @submit.prevent="login()">
    <h2>Авторизация</h2>
    <div class="form-group">
      <label for="email">Email</label>
      <input v-model="email" type="email" class="form-control" id="email" name="email" placeholder="Введите email">
    </div>
    <div class="form-group">
      <label for="password">Пароль</label>
      <input v-model="password" type="password" class="form-control" id="password" name="password" placeholder="Введите пароль">
    </div>
    <div class="resultString">
            <p v-if="isActive">{{ resultString }}</p>
        </div>
    <button type="submit" class="btn btn-primary">Войти</button>
    <router-link class="forgot-password" to="/forgotPassword" exact>Забыли пароль?</router-link>
    <div class="signup-link">Нет аккаунта? <router-link class="" to="/login" exact>Зарегистрируйтесь</router-link></div>
  </form>
</template>

<script>

import axios from "axios"
const md5 = require('md5')
import router from '../router/router.js'
export default {
  data() {
    return {
      email: '',
      password: '',
      resultString: '',
      isActive: true
    }
  },
  methods: {
    login() {
      if (this.email == '' || this.password == '') {
        this.resultString = "Заполните все поля";
        this.isActive = true;
        return;
      }

      const hashPssword = md5(this.password);
      const newUser = {
        email: this.email,
        password: hashPssword,
      }

      axios.post("http://localhost:8080/api/login", newUser, {
        headers: {
          "Content-type": "application/json"
        }
      }).then((res) => {
        this.resultString = res.data.message

        let ResultStringElement = document.querySelector('.resultString p');
        if (res.data.statusCode == 200) {
          ResultStringElement.style.color = 'green';
          router.push({ path: '/mainpage' })
        } else if(res.data.statusCode == 201){
          ResultStringElement.style.color = 'green';
        }

      }).catch((err) => {
        console.log(err)
      })


    }
  }
}
</script>

<style>
.login-form {
  position: absolute;
  width: 400px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  border: 1px solid #e6cc9c;
  border-radius: 7px;
  background-color: #fdf4e3;
  font-family: Arial, sans-serif;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.login-form h2 {
  text-align: center;
  margin-bottom: 20px;
  font-size: 24px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-control {
  display: block;
  width: 100%;
  height: 40px;
  padding: 10px;
  font-size: 16px;
  line-height: 1.5;
  color: #333;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
}

.btn {
  display: inline-block;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  text-decoration: none;
  border: 1px solid #007bff;
  border-radius: 5px;
  color: #fff;
  background-color: #007bff;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn:hover,
.btn:focus {
  background-color: #0062cc;
}

.btn-primary {
  display: block;
  width: 100%;
}

.forgot-password {
  display: block;
  margin-top: 20px;
  text-align: right;
  font-size: 14px;
  text-decoration: none;
  color: #0062cc;
}

.forgot-password:hover {
  transform: translate(3s);
  color: #103966;
}

.signup-link {
  margin-top: 20px;
  text-align: center;
  font-size: 14px;
}

.signup-link a {
  color: #007bff;
  text-decoration: none;
}

.signup-link a:hover {
  text-decoration: underline;
}
</style>