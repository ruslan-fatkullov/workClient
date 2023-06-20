<template>
    <div class="form-wrapper">
        <form class="change_pass_form" @submit.prevent="changePass()">
        <label for="new_password">Новый пароль:</label>
        <input v-model="password" type="password" id="new_password" name="new_password" required/><br/>

        <label for="confirm_password">Подтвердите новый пароль:</label>
        <input v-model="passwordConfirm" type="password" id="confirm_password" name="confirm_password" required/><br/>
        <div>
            <p>{{ resultString }}</p>
        </div>
        <div class="form-group">
            <input type="submit" value="Изменить пароль" class="yes"/>
            <div @click="$emit('closeForm')" value="Отменить" class="no">Отменить</div>
        </div>
    </form>
    </div>
    
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
            if (this.password !== this.passwordConfirm) {
                this.resultString = "Пароли не совпадают";
                return;
            }
            const hashPassword = md5(this.password);
            const body = {
                email: localStorage.getItem("email"),
                password: hashPassword,
            };
            axios
                .post(conf.SERVER_HOST + "/api/changePassword", body, {})
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
.form-wrapper{
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9999;
    position: fixed;
}
.change_pass_form {
    
    box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.5);
    padding: 20px;
    background-color: #f2f2f2;
    border-radius: 5px;
    position: absolute;
    margin: auto;
    top: 50%;
    left: 50%;
    z-index: 99;
    transform: translate(-50%, -50%);
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
input[type="submit"], .no {
    background-color: rgb(84, 200, 84);
    color: white;
    padding: 14px 20px;
    margin: 8px 0;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}
.no{
    background-color: rgb(202, 85, 85);
    width: 100%;
}
.no:hover{
    background-color: rgb(215, 40, 40);
}

input[type="submit"]:hover {
    background-color: rgb(22, 242, 22);
}


/* стили для заголовка */
h2 {
    text-align: center;
}
.form-group{
    display: flex;
    justify-content: space-between;
}
.form-group input {
    width: 100%;
    margin-right: 1rem;
}



@media only screen and (max-width : 900px) {
    .form-group {
        display: flex;
        margin: auto;
    }

}
</style>