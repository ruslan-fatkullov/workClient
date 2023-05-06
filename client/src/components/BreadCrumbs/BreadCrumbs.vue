<template>
    <div class="container">

        <div class="link_list_wrapper">
            <div v-for="link in bread_crumbs_computed" :key="link" class="link_item">
                <div @click="goToLink(link)">{{ link.label }}/</div>
            </div>
        </div>
    </div>
</template>

<script>
import router from '../../router/router'
import store from '../../store'
export default {
    data() {
        return {
            link_list: []
        }
    },
    computed: {
        bread_crumbs_computed() {
            return store.getters.getLinkList;
        }
    },
    methods: {
        goToLink(link) {
            router.push(link.link)
        }
    }
}
</script>

<style>
.link_list_wrapper {
    display: flex;
    width: 100%;
    margin: 15px 0;
}

.link_item {
    font-family: 'Rostelecom Basic Light', Helvetica, Arial, sans-serif;
    font-size: 14px;
    color: antiquewhite;
    margin: 0 4px;
}

.link_item:hover {
    cursor: pointer;
    color: rgb(205, 190, 248);
}

.link_item:last-child {
    color: rgb(183, 181, 179);
    cursor: auto;
}
</style>