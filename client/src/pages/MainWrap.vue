<template>
    <navBar></navBar>
    <router-view></router-view>
    <FooterComponent></FooterComponent>
</template>

<script>
import navBar from './NavigationPanel.vue'
import "../style/buttons.css"
import FooterComponent from '@/components/FooterComponent.vue';
//import BreadCrumbs from '../components/BreadCrumbs/BreadCrumbs.vue';
export default {
    components: {
        navBar,
        FooterComponent,
        //BreadCrumbs
    }
}
</script>

<style>
</style>