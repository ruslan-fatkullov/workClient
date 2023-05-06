<template>
    <div class="container admin-panel">


        <div class="tab-panel">
            <div class="tab-item" @click="setActive('users')" :class="{ activeTab: isActive('users') }">
                Пользователи
            </div>
            <div class="tab-item" @click="setActive('helps')" v-bind:class="{ activeTab: isActive('helps') }">
                Сообщения
            </div>
            <div class="tab-item" @click="setActive('deleted')" v-bind:class="{ activeTab: isActive('deleted') }">
                Удаленные
            </div>
        </div>

    </div>
    <TableUserComponent v-if="isActive('users')"></TableUserComponent>

    <TableHelpsComponentVue v-if="isActive('helps')"></TableHelpsComponentVue>
    <TableDeletedComponents v-if="isActive('deleted')"></TableDeletedComponents>
</template>

<script>
import "@/style/tabelStyle.css"
import TableUserComponent from "@/components/AdminPanelComponents/TableUsersComponent.vue"
import TableHelpsComponentVue from "@/components/AdminPanelComponents/TableHelpsComponent.vue"
import TableDeletedComponents from "@/components/AdminPanelComponents/TableDeletedUsersComponent.vue"
import store from "@/store/index"
import router from '../router/router'

export default {
    data() {
        return {
            activeTab: "users"
        }
    },
    methods: {
        isActive(value) {
            return this.activeTab === value
        },
        setActive(value) {
            this.activeTab = value
        }
    },
    beforeCreate() {
        if (!localStorage.getItem("login_status")) {
            router.push("/")
        }
    },
    mounted() {
        store.dispatch("setLinkListAction", [{ label: "Главная", link: "/" }, { label: "Панель администрирования", link: "/adminPanel" }])
    },

    components: {
        TableUserComponent,
        TableHelpsComponentVue,
        TableDeletedComponents,
    },



}
</script>

<style scoped>
.admin-panel{
    font-family: 'Rostelecom Basic Light', Helvetica, Arial, sans-serif;
}
.tab-panel {
    width: 100%;
    display: flex;
}

.tab-item {
    width: 150px;
    padding: 10px 10px;
    background-color: #eaf2eb;
    border-radius: 5px 5px 0 0;
    margin-right: 10px;
    color: rgb(50, 52, 54);
    font-weight: bold;
    outline: 1px solid #37c748;
}

.tab-item:last-child {
    background-color: #d37a7a;
    margin-left: auto;
}


.tab-item:hover {
    cursor: pointer;
}

.activeTab {
    width: 150px;
    padding: 10px 10px;
    background-color: #37c748;
    border-radius: 5px 5px 0 0;
    margin-right: 10px;
    color: aliceblue;
    font-weight: bold;
    outline: 1px solid #37c748;
}
</style>