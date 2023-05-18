<template>
    <div class="wrapper">
        <div class="content">
            <navBar></navBar>
            <router-view></router-view>
        </div>
        <div class="footer">
            <FooterComponent></FooterComponent>
        </div>
    </div>
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
    },
}
</script>

<style scoped>
.wrapper {
    display: flex;
    flex-direction: column;
    min-height: 100%;
}

.content {
    flex: 1 0 auto;
}

.footer {
    flex: 0 0 auto;
}
</style>