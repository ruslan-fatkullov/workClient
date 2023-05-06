<template>
    <div @click="$emit('closeDetailEmit')" class="wrapper">
        <div @click.stop="" class="container">

            <div class="content">
                <div class="row">
                    <div class="col-md-6">
                        <div class="content-block">fatkullov@mail.ru</div>
                    </div>
                    <div class="col-md-6">
                        <div class="content-block">Фаткуллов Руслан Альфредович</div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <div class="content-block main-message">Не работает регистрация. При нажатии на кнопку регистрации бесконечно крутится логотип</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.wrapper {
    position: fixed;
    background-color: rgba(0, 0, 0, 0.5);
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
}

.content {
    background-color: rgb(201, 201, 201);
    border: 1px solid rgb(89, 89, 89);
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: 99;
    transform: translate(-50%, -50%);
    border-radius: 10px;
    padding: 30px;
}

.content-block {
    background-color: #fff;
    margin-left: 5px;
    margin-bottom: 15px;
    border-radius: 15px;
    padding: 20px;
}
.main-message{
    min-height: 300px;
}
</style>