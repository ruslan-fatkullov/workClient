<template>
    <form class="forgot-pass-from" @submit.prevent="changePassword()">
        <div class="form-group">
            <label for="email">Введите свой Email</label>
            <input v-model="email" type="email" id="email" name="email" required/>
        </div>
        <div>
            <p>{{ resultString }}</p>
        </div>
        <div class="button-group">
            <button type="submit">Отправить</button>
            <router-link class="btn-back" to="/" exact>Вернуться</router-link>
        </div>
    </form>
</template>

<script>
import axios from "axios";

const conf = require("../config");
export default {
    data: function () {
        return {
            email: "",
            resultString: "",
        };
    },
    methods: {
        changePassword: function () {
            console.log("asd");
            const body = {
                email: this.email,
            };
            axios
                .post(conf.SERVER_HOST + "/api/changePassToEmail", body, {})
                .then((res) => {
                    this.resultString = res.data.message;
                    console.log(res);
                })
                .catch((err) => {
                    console.log(err);
                });
        },
    },
};
</script>

<style scoped>
.forgot-pass-from {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 300px;
    padding: 2rem;
    background-color: #fdf4e3;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.form-group {
    margin-bottom: 1rem;
}

label {
    display: block;
    font-size: 1rem;
    margin-bottom: 0.5rem;
}

input[type="email"],
input[type="text"] {
    width: 100%;
    padding: 0.5rem;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 3px;
}

.btn-back {
    margin-left: 15px;
    line-height: 50px;
}

.button-group {
    display: flex;
    justify-content: center;
}

.code-group input[type="text"] {
    flex: 1;
    margin-right: 0.5rem;
    max-width: 30px;
    text-align: center;
}

button {
    padding: 0.5rem;
    font-size: 1rem;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 3px;
    cursor: pointer;
}

button:hover {
    background-color: #0069d9;
}

input[type="submit"] {
    background-color: #28a745;
}

input[type="submit"]:hover {
    background-color: #218838;
}

</style>