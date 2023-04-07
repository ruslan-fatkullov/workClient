<template>
    <navBar></navBar>
    <router-view></router-view>
    <footerBar></footerBar>
</template>

<script>
//import UserAuth from './UserAuth.vue';
import navBar from '../components/NavigationPanel.vue'
import footerBar from '../components/FooterComponent.vue'
export default {
    components: {
        ///UserAuth
        navBar,
        footerBar
    }
}
</script>

<style>
</style>