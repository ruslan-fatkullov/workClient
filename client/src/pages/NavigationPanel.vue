<template>
    <div @click="openMenu()" class="wrapper" ref="wrapper"></div>
    <div ref="plug" class="plug"></div>
    <div @click.stop="" ref="top_bar" class="top_bar">
        <div class="container nav-panel-wrapper">
            <div class="nav-panel">
                <div class="logo-burger-group">
                    <div class="site-logo"><router-link to="/"><img src="../assets/logo-menu.png" alt=""></router-link>
                    </div>

                    <div @click="openMenu()" class="hamburger_icon">
                        <span ref="hamburger_item" class="hamburger_item"></span>
                    </div>
                </div>

                <ul ref="nav" class="nav">
                    <li class="nav-item">
                        <div class="">
                            <router-link @click="openMenu()" class="nav-link" to="/">Главная</router-link>
                        </div>
                    </li>
                    <li class="nav-item">
                        <div class="">
                            <a @click="openMenu()" class="nav-link" href="">Сайт компании</a>
                        </div>
                    </li>
                    <li class="nav-item">
                        <div class="">
                            <router-link @click="openMenu()" class="nav-link" to="/techSupport">Техническая
                                поддержка</router-link>
                        </div>
                    </li>

                    <li v-if="isAuth" class="nav-item">
                        <div class="">
                            <router-link @click="openMenu()" class="nav-link" to="/adminPanel">Панель
                                администрирования</router-link>
                        </div>
                    </li>
                    <li v-if="isAuth" class="nav-item">
                        <div class="profile-list">
                            <div class="profile-link">{{ computeFullname }}
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                        class="dropdown-i bi bi-chevron-left" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd"
                                            d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" />
                                    </svg>
                                </span>
                            </div>
                            <div class="list">
                                <div @click="toProfile()" class="list-item">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                        class="bi bi-person-square" viewBox="0 0 16 16">
                                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                                        <path
                                            d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm12 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1v-1c0-1-1-4-6-4s-6 3-6 4v1a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12z" />
                                    </svg>
                                    Профиль
                                </div>
                                <div @click="showDialog = !showDialog" class="list-item">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                        class="bi bi-box-arrow-right" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd"
                                            d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z" />
                                        <path fill-rule="evenodd"
                                            d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z" />
                                    </svg>
                                    Выйти
                                </div>
                            </div>
                        </div>

                    </li>

                </ul>

            </div>
        </div>
    </div>
    <ConfirmDialogVue v-if="showDialog" :dialogTitle="'Вы действительно хотите выйти?'"
        @undoAction="showDialog = !showDialog" @confirmAction="logout()"></ConfirmDialogVue>
</template>

<script>
import ConfirmDialogVue from '../elements/ConfirmDialog.vue'
import router from '../router/router'
import store from '../store'



export default {
    data() {
        return {
            showDialog: false,
            showNavigation: false,
        }
    },
    created() {
        window.addEventListener('scroll', this.handleScroll);
    },
    mounted() {
        store.dispatch("setAuthBoolAction")
        store.dispatch("getUserByEmailAction")
    },
    unmounted() {
        window.removeEventListener('scroll', this.handleScroll);
    },
    methods: {
        handleScroll() {
            let screenHeight = window.screen.height
            let navHeight = screenHeight / 100 * 8
            if (window.scrollY > navHeight) {
                this.$refs.top_bar.classList.add("fixed_navigation")
                this.$refs.plug.classList.add("plug-visible")
            } else {
                this.$refs.top_bar.classList.remove("fixed_navigation")
                this.$refs.plug.classList.remove("plug-visible")
            }
        },
        toProfile() {
            this.openMenu()
            router.push("/about")
        },
        logout() {
            this.openMenu()
            this.showDialog = false
            store.dispatch("logoutUser")
        },
        openMenu() {
            this.showNavigation = !this.showNavigation
            if (this.showNavigation) {

                this.$refs.hamburger_item.classList.add("hamburger_rotate")
                this.$refs.wrapper.classList.add("nav_active_wrapper")
                this.$refs.nav.classList.add("nav_active")
                return
            }
            this.$refs.hamburger_item.classList.remove("hamburger_rotate")
            this.$refs.wrapper.classList.remove("nav_active_wrapper")
            this.$refs.nav.classList.remove("nav_active")

        },
        asd() {
            alert("DSa")
        }
    },
    computed: {
        computeFullname() {
            let fullName = store.getters.getAuthUserInfo
            return fullName.firstName + " " + fullName.lastName
        },
        isAuth() {
            return store.getters.getAuthBool
        },
    },
    components: {
        ConfirmDialogVue
    }
}
</script>

<style scoped>
.plug {
    height: 8vh;
    display: none;
}

.plug-visible {
    display: block;
}

.top_bar {
    background-color: #fff;
    width: 100%;
    position: relative;
    z-index: 9999;
    height: 8vh;
}

.fixed_navigation {
    position: fixed;
    opacity: .98;
    top: 0;
    animation: fixed_menu .3s linear;
}

@keyframes fixed_menu {
    0% {
        transform: translateY(-100px);
    }

    100% {
        transform: translateY(0px);
    }
}

.site-logo {
    font-family: 'Rostelecom Basic Light', Helvetica, Arial, sans-serif;
    margin: auto 0;
}

.site-logo img {
    height: 100%;
}

.nav-panel {
    background-color: #ffffff;
    display: flex;
    height: 8vh;
}

.nav {
    display: flex;
    margin-left: auto;
}

.nav-item {
    margin: auto 0;
}

.nav-link {
    user-select: none;
    font-family: 'Rostelecom Basic Light', Helvetica, Arial, sans-serif;
    position: relative;
    font-size: 14px;
    color: #075668;
    text-decoration: none;
    line-height: 2;
}

.profile-link {
    font-family: 'Rostelecom Basic Light', Helvetica, Arial, sans-serif;
    position: relative;
    padding: 5px 10px;
    font-size: 14x;
    line-height: 2;
    letter-spacing: 1px;
    border: 1px solid;
    border-radius: 5px;
    width: auto;
    user-select: none;
}

.nav-link:after {
    display: block;
    left: 0;
    width: 0;
    height: 4px;
    background-color: #075668;
    content: "";
    transition: width 0.3s ease-out;
}

.nav-link:hover:after {
    width: 100%;
}

.profile-list {
    position: relative;
    display: inline-block;
}

.profile-list:hover .list {

    display: block;
}

.profile-link:hover {
    cursor: pointer;
}

.profile-list:hover .profile-link {
    border-radius: 5px 5px 0 0;
}


.profile-list:hover .profile-link svg {
    transition-duration: 250ms;
    transform: rotate(-90deg);
}


.profile-list:hover .list-item:last-child {
    border-radius: 0 0 5px 5px;
}


.list {
    z-index: 99;
    position: absolute;
    display: none;
    width: 100%;
    user-select: none;
    box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5);
}

.list-item {
    font-family: 'Rostelecom Basic Light', Helvetica, Arial, sans-serif;
    background-color: #ffffff;
    line-height: 2;
    padding: 5px;
    font-size: 14px;

}

.list-item:hover {
    background-color: #075668;
    color: #f0ebeb;
    cursor: pointer;
}

/* адаптив */
.hamburger_icon {
    display: none;
}

.logo-burger-group {
    display: flex;
}

@media only screen and (max-width : 900px) {

    .nav-panel {
        display: block;
        height: auto;
        position: relative;

    }

    .top_bar {

        height: auto;
        z-index: 99;
    }

    .site-logo img {
        width: 150px;
    }

    .nav {
        display: none;
        background-color: #f5f5f5;
        padding: 30px;
        border-radius: 0 0 10px 10px;
        position: absolute;
        z-index: -1;
        right: 0;
        animation: slide-down .5s;
    }

    @keyframes slide-down {
        0% {
            transform: translateY(-300px);
        }

        100% {
            transform: translateY(0px);

        }
    }

    .nav_active {
        display: block;
    }

    .nav_active_wrapper {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 98;
        background-color: rgba(0, 0, 0, .7);
    }

    .nav-item {
        border-bottom: 1px solid rgb(92, 92, 92);
        padding: 5px 0;
    }


    .hamburger_icon {
        margin-left: auto;
        margin-top: auto;
        margin-right: 20px;
        width: 25px;
        height: 25px;
        display: block;
        position: relative;
    }

    .hamburger_icon:hover {
        cursor: pointer;
    }

    .hamburger_item {
        display: block;
        position: relative;
        content: '';
        width: 25px;
        height: 3px;
        background-color: rgb(82, 82, 82);
        border-radius: 4px;
        margin: auto auto;
        transition-property: transform;
        transition-duration: 250ms;
        transition-timing-function: ease;
    }

    .hamburger_item::before {
        position: absolute;
        display: block;
        width: 25px;
        content: '';
        height: 3px;
        background-color: rgb(82, 82, 82);
        border-radius: 4px;
        transform: translateY(-8px);
    }

    .hamburger_item::after {
        position: absolute;
        display: block;
        content: '';
        width: 25px;
        height: 3px;
        background-color: rgb(82, 82, 82);
        border-radius: 4px;
        transform: translateY(8px);
    }

    .hamburger_rotate {
        transform: rotate(-45deg);
    }

    .hamburger_rotate::before {
        transform: rotate(90deg);
    }

    .hamburger_rotate::after {
        display: none;
    }

    .wrapper {}

}
</style>