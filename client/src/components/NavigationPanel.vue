<template>
    <div class="nav-panel text-white">
        <h3 class="float-md-start mb-0 site-logo">"OOO" ЭСВО</h3>
        <ul class="nav">
            <li class="nav-item">
                <div class="">
                    <router-link class="nav-link" to="/">Главная</router-link>
                </div>
            </li>
            <li class="nav-item">
                <div class="">
                    <a class="nav-link" href="https://www.esvoavia.ru/">Сайт компании</a>
                </div>
            </li>
            <li class="nav-item">
                <div class="">
                    <router-link class="nav-link" to="/techSupport">Техническая поддержка</router-link>
                </div>
            </li>
            <li class="nav-item">
                <div class="">
                    <router-link class="nav-link" to="/about">Личный кабинет</router-link>
                </div>
            </li>
            <li class="nav-item">
                <div class="">
                    <router-link class="nav-link" to="/adminPanel">Панель администрирования</router-link>
                </div>
            </li>

        </ul>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.site-logo {
    margin: 30px;
}

.nav-panel {
    display: block;
    margin-top: 0;
    background-color: #212529;
}

.nav-item {
    margin: 5px;
}

.nav {
    padding: 15px 0;
    margin: 0 150px;
    display: flex;
    justify-content: right;
}

.nav-link {
    position: relative;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    font-size: 16px;
    color: rgba(255, 255, 255, 0.753);
    text-decoration: none;
    line-height: 2;
}

.nav-link:after {
    display: block;
    left: 0;
    width: 0;
    height: 4px;
    background-color: rgba(255, 255, 255, 0.753);
    content: "";
    transition: width 0.3s ease-out;
}

.nav-link:hover:after,
.nav-link:focus:after {
    width: 100%;
}</style>