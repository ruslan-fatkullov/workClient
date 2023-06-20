<template>
    <div @click="openMenu()" class="wrapper" ref="wrapper"></div>
    <div @click.stop="" ref="top_bar" class="top_bar">
        <div class="container nav-panel-wrapper">
            <div class="nav-panel">
                <div class="logo-burger-group">
                    <div class="site-logo"><router-link to="/"><img src="../assets/logo-menu.png" alt=""></router-link>
                    </div>

                    <div @click="openMenu()" class="hamburger_icon">
                        <span ref="hamburger_item_before" class="hamburger_item"></span>
                        <span ref="hamburger_item" class="hamburger_item"></span>
                        <span ref="hamburger_item_after" class="hamburger_item"></span>
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
                            <a @click="openMenu()" class="nav-link" href="https://esvoavia.ru" target="_blank">Сайт
                                компании</a>
                        </div>
                    </li>
                    <li class="nav-item">
                        <div class="">
                            <router-link @click="openMenu()" class="nav-link" to="/techSupport">Техническая
                                поддержка</router-link>
                        </div>
                    </li>

                    <!--<li v-if="isAuth" class="nav-item">
                        <div class="">
                            <router-link @click="openMenu()" class="nav-link" to="/adminPanel">Панель
                                администрирования</router-link>
                        </div>
                    </li>-->
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
                                    <div class="profile-svg"></div>
                                    Профиль
                                </div>
                                <div @click="showDialog = !showDialog" class="list-item">
                                    <div class="exit-svg"></div>
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
            let navHeight = screenHeight / 100 * 10
            if (window.scrollY > navHeight) {
                this.$refs.top_bar.classList.add("fixed_navigation")
                this.$emit('setMargin', 1)
            }
            if (window.scrollY === 0) {
                this.$refs.top_bar.classList.remove("fixed_navigation")
                this.$emit('setMargin', 0)
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
                this.$refs.hamburger_item_before.classList.add("hamburger_rotate_before")
                this.$refs.hamburger_item_after.classList.add("hamburger_rotate_after")
                this.$refs.wrapper.classList.add("nav_active_wrapper")
                this.$refs.nav.classList.add("nav_active")
                return
            }
            this.$refs.hamburger_item.classList.remove("hamburger_rotate")
            this.$refs.hamburger_item_before.classList.remove("hamburger_rotate_before")
            this.$refs.hamburger_item_after.classList.remove("hamburger_rotate_after")
            this.$refs.wrapper.classList.remove("nav_active_wrapper")
            this.$refs.nav.classList.remove("nav_active")

        },
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
.profile-svg {
    height: 16px;
    width: 16px;
    background: url('../assets/svg/profile-svg.svg') no-repeat;
    margin-top: auto;
    margin-bottom: auto;
    margin-right: .5rem;
}

.exit-svg {
    height: 16px;
    width: 16px;
    background: url('../assets/svg/exit-svg.svg') no-repeat;
    margin-top: auto;
    margin-bottom: auto;
    margin-right: .5rem;
}

.top_bar {
    background-color: #fff;
    width: 100%;
    z-index: 9999;
    height: 10vh;
    animation: set_opacity .4s linear;
}


@keyframes set_opacity {
    0% {
        opacity: .94;
    }

    100% {
        opacity: 1;
    }
}


.fixed_navigation {
    position: fixed;
    opacity: .94;
    top: 0;
    animation: fixed_menu_down .3s linear;
}



@keyframes fixed_menu_down {
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
    height: 70%;
}

.nav-panel {
    background-color: #ffffff;
    display: flex;
    height: 10vh;
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
    font-size: 1.4rem;
    color: #075668;
    text-decoration: none;
    line-height: 2;
}

.profile-link {
    font-family: 'Rostelecom Basic Light', Helvetica, Arial, sans-serif;
    position: relative;
    padding: .7rem 1rem;
    font-size: 20x;
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
    display: flex;
    justify-content: center;

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

@media only screen and (max-width : 1400px) {

    .nav-link {
        font-size: 1.1rem;
    }
}


@media only screen and (max-width : 1200px) {
    .wrapper {
        z-index: -9999;
    }


    .nav-panel {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .top_bar {
        position: relative;
        z-index: 9999;
        height: 10vh;
    }
    .fixed_navigation{
        position: fixed;
    }

    .logo-burger-group {
        position: relative;
    }

    .site-logo img {
        height: 100%;
        padding: 4% 0;
    }

    .site-logo {
        height: 10vh;
        position: relative;
    }

    .nav {
        display: none;
        background-color: #f5f5f5;
        padding: 30px;
        margin-top: 10vh;
        border-radius: 0 0 10px 10px;
        position: absolute;
        z-index: -1;
        right: 9vw;
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
        z-index: 1;
        background-color: rgba(0, 0, 0, .7);
    }

    .nav-item {
        border-bottom: 1px solid rgb(92, 92, 92);
        padding: 5px 0;
    }



    .hamburger_icon {
        margin-left: auto;
        margin-top: auto;
        margin-bottom: auto;
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
        content: '';
        width: 25px;
        height: 3px;
        margin-bottom: 5px;
        background-color: rgb(82, 82, 82);
        border-radius: 4px;
    }



    .hamburger_rotate {
        transform: rotate(45deg);
        animation: disapear_hamburger .3s ease;
    }

    @keyframes disapear_hamburger {
        0% {
            transform: rotate(0deg);
        }

        100% {
            transform: rotate(45deg);
        }
    }

    .hamburger_rotate_before {
        transform: translateY(8px) rotate(45deg);
        animation: rotate_before .3s ease;
    }

    @keyframes rotate_before {
        0% {
            transform: translateY(0px) rotate(0deg);
        }

        100% {
            transform: translateY(8px) rotate(45deg);
        }
    }

    .hamburger_rotate_after {
        transform: translateY(-8px) rotate(-45deg);
        animation: rotate_after .3s ease;
    }

    @keyframes rotate_after {
        0% {
            transform: translateY(0px) rotate(0deg);
        }

        100% {
            transform: translateY(-8px) rotate(-45deg);
        }
    }

}
</style>