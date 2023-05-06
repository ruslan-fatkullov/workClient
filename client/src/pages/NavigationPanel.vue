<template>
    <div class="top_bar">
        <div class="container">
            <div class="nav-panel">
                <div class="site-logo"><img src="../assets/logo-menu.png" alt=""></div>

                <div class="hamburger_icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                        <path
                            d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
                    </svg>
                </div>
                <ul class="nav">
                    <li class="nav-item">
                        <div class="">
                            <router-link class="nav-link" to="/">Главная</router-link>
                        </div>
                    </li>
                    <li class="nav-item">
                        <div class="">
                            <router-link class="nav-link" to="/techSupport">Техническая поддержка</router-link>
                        </div>
                    </li>
                    <li v-if="isAuth" class="nav-item">
                        <div class="">
                            <router-link class="nav-link" to="/adminPanel">Панель администрирования</router-link>
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
import ConfirmDialogVue from '../components/ConfirmDialog.vue'
import router from '../router/router'
import store from '../store'



export default {
    data() {
        return {
            showDialog: false
        }
    },
    mounted() {
        store.dispatch("setAuthBoolAction")
        store.dispatch("getUserByEmailAction")
    },
    methods: {
        toProfile() {
            router.push("/about")
        },
        logout() {
            this.showDialog = false
            store.dispatch("logoutUser")
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

<style >
.top_bar {
    background-color: #fff;
    z-index: 9999;
}

.site-logo {
    font-family: 'Rostelecom Basic Light', Helvetica, Arial, sans-serif;
    margin: auto 0;
}

.site-logo img {
    width: 150px;
}

.nav-panel {
    background-color: #ffffff;
    display: flex;
}

.nav {
    padding: 15px 0;
    margin-left: auto;
}

.nav-item {
    margin: auto 0;
}

.nav-link {
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

@media only screen and (max-width : 1200px) {
    .nav-panel {
        display: block;
    }

    .nav {
        display: block;
    }

    .nav-item {

    }

    .hamburger_icon {
        margin-left: auto;
        margin-right: 20px;
        width: 20px;
        height: 20px;
        display: block;
        color: black;
    }
}</style>