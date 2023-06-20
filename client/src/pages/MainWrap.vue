<template>
    <div ref="wrapper" class="wrapper">
        <div class="navigation-content">
            <navBar @setMargin="setMargin"></navBar>
            <div ref="content_main" class="content_main">
                <router-view></router-view>
            </div>
        </div>
        <div class="footer">
            <FooterComponent></FooterComponent>
        </div>
        <div ref="up_button" class="up_button" @click="scrollUp()">
        </div>
    </div>
</template>

<script>
import navBar from './NavigationPanel.vue'
import "../style/buttons.css"
import FooterComponent from '@/components/FooterComponent.vue';
export default {
    components: {
        navBar,
        FooterComponent,
    },
    created() {
        window.addEventListener('scroll', this.handleScroll);
    },
    methods: {
        handleScroll() {
            let screenHeight = window.screen.height
            if (window.scrollY > screenHeight / 3) {
                this.$refs.up_button.classList.remove("up_button_hidden")
                this.$refs.up_button.classList.add("up_button_active")
            } else {
                this.$refs.up_button.classList.remove("up_button_active")
                this.$refs.up_button.classList.add("up_button_hidden")
            }
        },
        scrollUp() {
            this.$refs.wrapper.scrollIntoView({ 'behavior': 'smooth' });
        },
        setMargin(n) {
            if(n){
                this.$refs.content_main.classList.add("main_top_margin")
            }else{
                this.$refs.content_main.classList.remove("main_top_margin")

            }
        }
    }
}
</script>

<style scoped>
.main_top_margin {
    margin-top: 10vh;
}

.wrapper {
    display: flex;
    flex-direction: column;
    min-height: 100%;
}

.navigation-content {
    flex: 1 0 auto;
}

.footer {
    flex: 0 0 auto;
}

.up_button {
    width: 48px;
    height: 48px;
    background-color: #075668;
    position: fixed;
    right: 30px;
    bottom: 50px;
    background: url("../assets/svg/up-chevron-svgrepo-com.svg") 0 0 no-repeat;
    transform: translateX(100px);
}

.up_button:hover {
    cursor: pointer;
}

@keyframes hide_button {
    0% {
        transform: translateX(0px);
    }

    100% {
        transform: translateX(100px);
    }
}

.up_button_hidden {
    transform: translateX(100px);
    animation: hide_button .3s ease;
}

@keyframes show_button {
    0% {
        transform: translateX(100px);
    }

    100% {
        transform: translateX(0px);
    }
}

.up_button_active {
    transform: translateX(0px);
    animation: show_button .3s ease;
}
</style>