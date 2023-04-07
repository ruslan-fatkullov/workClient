<template>
  <form class="change_pass_form" @submit.prevent="changePass()">
    <label for="new_password">Новый пароль:</label>
    <input v-model="password" type="password" id="new_password" name="new_password" required /><br />

    <label for="confirm_password">Подтвердите новый пароль:</label>
    <input v-model="passwordConfirm" type="password" id="confirm_password" name="confirm_password" required /><br />
    <div>
      <p>{{ resultString }}</p>
    </div>
    <div class="form-group">
      <input type="submit" value="Изменить пароль" />
      <input @click="$emit('closeForm')" type="submit" value="Отменить" />
    </div>
  </form>
</template>

<script>
import axios from "axios";
const md5 = require('md5')
const conf = require("../config");
export default {
  props: {
    isActive: Boolean
  },
  data: function () {
    return {
      password: "",
      passwordConfirm: "",
      resultString: "",
    };
  },
  methods: {
    changePass() {
      if (this.password != this.passwordConfirm) {
        this.resultString = "Пароли не совпадают";
        return;
      }
      const hashPssword = md5(this.password);
      const body = {
        email: localStorage.getItem("email"),
        password: hashPssword,
      };
      axios
        .post(conf.SERVER_HOST + "/api/changePassword", body, {
          headers: {
            "Content-type": "application/json",
          },
        })
        .then((res) => {
          localStorage.removeItem("password")
          localStorage.setItem("password", body.password)
          alert("Пароль успешно заменен")
          this.resultString = res.data.message;
          console.log(res);
          this.$emit('closeForm')
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
.change_pass_form {
  box-shadow: 0px 0px 0px 9999px rgba(0, 0, 0, 0.5);
  transform: translate(-50%, -50%);
  margin: auto;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 25%;
  padding: 20px;
  background-color: #f2f2f2;
  border-radius: 5px;
}

/* стили для полей ввода */
input[type="password"],
input[type="text"] {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

/* стили для кнопки */
input[type="submit"] {
  background-color: #4caf50;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

input[type="submit"]:hover {
  background-color: #4d8f4f;
}


/* стили для заголовка */
h2 {
  text-align: center;
}
.form-group input{
  margin-left: 15px;
}
</style>