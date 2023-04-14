<template>
    <div class="main-page">
        <div v-if="loadPage" class="preloader">
            <div class="preloader__row">
                <div class="preloader__item"></div>
                <div class="preloader__item"></div>
            </div>
        </div>
        <h1>Главная</h1>
        <p style="font-size: 24px;">Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita asperiores quas
            impedit vero, modi repellendus esse accusamus fugit praesentium tempore delectus, voluptates eligendi similique
            neque dolore vitae dolores commodi Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita asperiores
            quas impedit vero, modi repellendus esse accusamus fugit praesentium tempore delectus, voluptates eligendi
            similique neque dolore vitae dolores commodi qui.</p>

    </div>
</template>

<script>
import router from '../router/router'
import axios from 'axios'
//import router from "../router"
export default {
    data() {
        return {
            loadPage: true
        }
    },
    methods: {
        logout() {
            localStorage.removeItem("email")
            localStorage.removeItem("password")
            router.push({ path: "/login" })
        },
        aboutPage() {
            router.push({ path: "/about" })
        }
    },
    beforeCreate() {
        const em = localStorage.getItem("email")
        const ps = localStorage.getItem("password")
        if (em == null || ps == null) {
            router.push({ path: "/login" })
            return
        }
        const newUser = {
            email: em,
            password: ps
        }
        axios.post("http://localhost:8080/api/login", newUser, {
            headers: {
                "Content-type": "application/json"
            }
        }).then((res) => {
            if (res.data.statusCode == 200) {
                this.loadPage = false
                return
            }
            router.push({ path: "/login" })
        }).catch((err) => {
            console.log(err)
        })
    },
    components: {
    }
}
</script>

<style>
.main-page{
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