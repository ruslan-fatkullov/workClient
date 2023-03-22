<template>
    <div class="container_main">
        <div class="user_main">Иванов Иван</div>
        <router-link class="button_main" to="/" exact>Выйти</router-link>
        <h1>Пример страницы с кнопкой выхода и именем пользователя</h1>
        <p>Это простой пример HTML страницы с кнопкой выхода и именем пользователя в правом верхнем углу.</p>
        <p>Вы можете изменить текст и стили, чтобы адаптировать этот пример под свои потребности.</p>
    </div>
</template>

<script>
export default {

}
</script>

<style>
.container_main {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
}

.user_main {
    float: right;
    margin-right: 20px;
    font-size: 18px;
    font-weight: bold;
}

.button_main {
    float: right;
    margin-right: 20px;
    padding: 10px 20px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 18px;
    font-weight: bold;
}

.button_main:hover {
    background-color: #3e8e41;
}
</style>