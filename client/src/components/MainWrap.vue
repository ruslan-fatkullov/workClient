<template>
    <navBar></navBar>
    <router-view></router-view>
</template>

<script>
//import UserAuth from './UserAuth.vue';
import navBar from '../components/NavigationPanel.vue'
export default {
    components: {
        ///UserAuth
        navBar,
    }
}
</script>

<style>
</style>