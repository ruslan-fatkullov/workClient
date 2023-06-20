<template>
    <div class="wrapper">
        <div class="landing-element">
            <div ref="left_image" @click="prevImage()" class="left-image"><img src="../assets/slider/projects2.png" alt=""></div>
            <div ref="main_image" class="main-image"><img src="../assets/slider/projects1.png" alt=""></div>
            <div ref="right_image" @click="nextImage()" class="right-image"><img src="../assets/slider/projects3.png" alt=""></div>
        </div>
        <div class="landing-element">
            <div class="side-image"></div>
        </div>
        <div class="landing-element">
            <div class="side-image"></div>
        </div>
        <div class="landing-element">
            <div class="side-image"></div>
        </div>
    </div>
</template>

<script>
export default {
    methods:{
        nextImage(){
            this.$refs.main_image.classList.remove('main-image')
            this.$refs.main_image.classList.add('left-image')
            this.$refs.right_image.classList.remove('right-image')
            this.$refs.right_image.classList.add('main-image')
            this.$refs.left_image.classList.remove('left-image')
            this.$refs.left_image.classList.add('right-image')
        },
        prevImage(){
            this.$refs.main_image.classList.remove('main-image')
            this.$refs.main_image.classList.add('right-image')
            this.$refs.right_image.classList.remove('right-image')
            this.$refs.right_image.classList.add('left-image')
            this.$refs.left_image.classList.remove('left-image')
            this.$refs.left_image.classList.add('main-image')
        }
    }
}
</script>

<style scoped>
.wrapper{
    overflow: hidden;
}
.landing-element {
    height: 90vh;
    position: relative;
}

.main-image {
    position: absolute;
    height: 80%;
    width: 60%;
    left: 20%;
    top: 5%;
    z-index: 1;
    outline: 1px solid white; 
    border-radius: 10px;
    background: url('../assets/slider/projects3.png') no-repeat;
    animation: slide_image 5s linear infinite;
    transition: all .3s;
}
.main-image img{
    height: 100%;
    width: 100%;
}
@keyframes slide_image {
    0%{
        transform: translateX(0px)
    }
    2%{
        transform: translateX(-5px)
    }
    4%{
        transform: translateX(5px)
    }
    6%{
        transform: translateX(0px)
    }
    100%{
        transform: translateX(0px)
    }
}
.left-image{
    border-radius: 10px;
    position: absolute;
    outline: 1px solid white; 
    height: 80%;
    width: 60%;
    top: 10%;
    opacity: .3;
    left: -30%;
    transition: all .3s;
}
.left-image img{
    height: 100%;
    width: 100%;
}
.right-image{
    border-radius: 10px;
    position: absolute;
    outline: 1px solid white; 
    height: 80%;
    width: 60%;
    top: 10%;
    opacity: .3;
    transition: all .3s;
    left: 70%; 
}
.right-image img{
    height: 100%;
    width: 100%;
}
.left-image:hover{
    opacity: 1;
    outline: 1px solid green; 
    cursor: pointer;
}
.right-image:hover{
    opacity: 1;
    outline: 1px solid green; 
    cursor: pointer;
}





.landing-element .side-image {
    position: absolute;
    z-index: -1;
    width: 100%;
    height: 90%;
    left: 45%;
    border-radius: 5%;
    background: url('../assets/slider/projects3.png') no-repeat;
}

.landing-element:nth-child(even) .side-image {
    left: -25%;
    background: url('../assets/slider/projects1.png') no-repeat;

}
</style>