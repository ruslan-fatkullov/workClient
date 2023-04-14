<template>
    <div class="main-page">
        <div v-if="loadPage" class="preloader">
            <div class="preloader__row">
                <div class="preloader__item"></div>
                <div class="preloader__item"></div>
            </div>
        </div>
        <h1>Главная</h1>
        <p style="font-size: 24px;">сгенерируй осмысленный текст, не содержащий грамматических ошибок.
            Выбери из списка одну букву и напиши слово, которое будет начинаться на эту букву.
            Не используй в слове букву, которая уже есть в списке.
            Если слово начинается на одну из букв, то можно использовать любую другую букву.
            Например: В слове "охота" нельзя использовать буквы "а" и "о". В случае, если в слове есть буква "в", то
            нельзя использовать ни "а", ни "о", потому что это две разные буквы.
            В списке есть только одна буква "г".
            Напиши слово "га"</p>

    </div>
</template>

<script>
import router from '../router/router'
import axios from 'axios'
import config from '../config'


export default {
    data() {
        return {
            loadPage: true
        }
    },
    beforeCreate() {
        const em = localStorage.getItem("email")
        const ps = localStorage.getItem("password")
        if (em == null || ps == null) {
            router.push({path: "/login"})
            return
        }
        const newUser = {
            email: em,
            password: ps
        }
        axios.post(config.SERVER_HOST + "/api/login", newUser, {}).then((res) => {
            if (res.data.statusCode === 200) {
                this.loadPage = false
                return
            }
            router.push({path: "/login"})
        }).catch((err) => {
            console.log(err)
        })
    },
}
</script>

<style>
.main-page {
    background-color: #212529;
    color: #e0e0e0;
}

.preloader {
    /*фиксированное позиционирование*/
    position: fixed;
    /* координаты положения */
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    /* фоновый цвет элемента */
    background: #212529;
    /* размещаем блок над всеми элементами на странице (это значение должно быть больше, чем у любого другого позиционированного элемента на странице) */
    z-index: 1001;
}

.preloader__row {
    position: relative;
    margin: auto;
    top: 45%;
    width: 10%;
    height: 10%;
    text-align: center;
    animation: preloader-rotate 2s infinite linear;
}

.preloader__item {
    position: absolute;
    display: inline-block;
    top: 0;
    background-color: #337ab7;
    border-radius: 100%;
    width: 35px;
    height: 35px;
    animation: preloader-bounce 2s infinite ease-in-out;
}

.preloader__item:last-child {
    top: auto;
    bottom: 0;
    animation-delay: -1s;
}

@keyframes preloader-rotate {
    100% {
        transform: rotate(360deg);
    }
}

@keyframes preloader-bounce {

    0%,
    100% {
        transform: scale(0);
    }

    50% {
        transform: scale(1);
    }
}

.loaded_hiding .preloader {
    transition: 0.3s opacity;
    opacity: 0;
}

.loaded .preloader {
    display: none;
}</style>