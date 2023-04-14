<template>
    <div>
        <div class="table">
            <div class="head">
                <div class="row table-row">
                    <div class="col table-header">Имя</div>
                    <div class="col table-header">Фамилия</div>
                    <div class="col table-header">Email</div>
                    <div class="col table-header">Верификация</div>
                    <div class="col table-header"></div>
                    <div class="col table-header"></div>
                </div>
            </div>
            <div class="table-body">
                <div class="row table-row" v-for="user in users" :key="user.id">
                    <div class="col table-data">
                        <input v-if="changeMode[users.indexOf(user)]" type="text" v-model=user.firstName>
                        <p v-else>{{ user.firstName }}</p>
                    </div>
                    <div class="col table-data">
                        <input v-if="changeMode[users.indexOf(user)]" type="text" v-model=user.lastName>
                        <p v-else>{{ user.lastName }}</p>
                    </div>
                    <div class="col table-data">
                        <input v-if="changeMode[users.indexOf(user)]" type="text" v-model=user.email>
                        <p v-else>{{ user.email }}</p>
                    </div>
                    <div class="col table-data">
                        <input v-if="changeMode[users.indexOf(user)]" type="checkbox" v-model=user.active>
                        <input v-else type="checkbox" v-model=user.active disabled>
                    </div>
                    <div class="col table-data">
                        <div id=user.id v-if="!changeMode[users.indexOf(user)]" class="btn btn-warning"
                             @click="changeUser(user)">Редактировать
                        </div>
                        <div v-else class="btn btn-success" @click="changeUser(user)">Подтвердить</div>
                    </div>
                    <div class="col table-data">
                        <div v-if="changeMode[users.indexOf(user)]" @click="undoChange(users.indexOf(user))"
                             class="btn btn-danger">
                            Отменить
                        </div>
                        <div v-else class="btn btn-danger" @click="setDeleteUser(user)">Удалить</div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
export default {}
</script>
<style>
.table {
    width: 100%;
    margin-bottom: 20px;
    border: 5px solid #fff;
    border-bottom-width: 3px;
    border-collapse: collapse;
    outline: 3px solid #37c748;
    font-size: 15px;
    background: #fff !important;
}

.table div.table-header {

    font-weight: bold;
    padding: 7px 7px 7px 20px;
    background: #37c748;
    border: none;
    text-align: left;
}

.table div.table-body {
    padding: 7px;
    border: none;
    border-top: 3px solid #fff;
    border-bottom: 3px solid #fff;
    text-align: left;
}

.table input[type='text'] {
    outline: none;
    margin-left: 7px;
}

.table p {
    margin: 3px 10px;
}

.table input[type='checkbox']:hover {
    cursor: pointer;
}

.table input[type='checkbox'] {
    margin-left: 25%;
    content: "";
    display: block;
    width: 26px;
    height: 26px;
    border: 20px solid #555555;
    border-radius: 50%;
    background-color: white;
}

.table div.table-body .table-row:nth-child(even) {
    background: #f8f8f8 !important;
}

.table div.table-data {
    padding-left: 10px;
}

.table div.table-data p {
    width: auto;
    overflow-wrap: normal;
    word-wrap: normal;
    word-break: normal;
    line-break: auto;
    hyphens: manual;
}


.table-row-helps {
    margin: 0 5px;
}

.table-row-helps:hover {
    outline: 1px solid RGB(170, 170, 170);
    background-color: RGB(240, 240, 240);
    border-radius: 5px;
    cursor: pointer;
}

.table-data {
    position: relative;
}

.table-data .btn {
    float: right;
}
</style>