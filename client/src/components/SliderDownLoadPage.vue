<template>
    <div class="container slider_wrapper">
        <div ref="carousel_wrapper" class="carousel-wrapper">
            <div @click="previous()" class="left">
            </div>
            <div class="image_center" @click="large_image()">

            </div>
            <img class="slider_image slide" v-for="(image, index) in images" :key="image"
                :class="{ 'active_image': isActive(index) }" :src="image.src" alt="">
            <div @click="next()" class="right">
            </div>
        </div>

        <!--<div class=" justify-content-center pagination">
                    <div @click="setActive(index)" v-for="(item, index) in images" class="pagination_item"
                        :class="{ active_item: isActive(index) }" :key="item">
                    </div>
                </div>-->
        <div class="tumb_group">
            <div @click="setActive(index)" v-for="(image, index) in images" :key="image" class="tumb"
                :class="{ active_tumb: isActive(index) }">
                <img :src='image.src' alt="">
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            images: [{ name: 'img1', src: require('../assets/slider/projects1.png') },
            { name: 'img2', src: require('../assets/slider/projects2.png') },
            { name: 'img3', src: require('../assets/slider/projects3.png') },
            { name: 'img4', src: require('../assets/slider/projects4.png') },],

            currentIndex: 0,
        }
    },
    methods: {
        isActive(index) {
            if (index === this.currentIndex) {
                return true
            }
            return false
        },
        setActive(index) {
            this.currentIndex = index
        },
        next() {
            if (this.currentIndex < this.images.length - 1) {
                this.currentIndex += 1
            } else {
                this.currentIndex = 0
            }
        },
        previous() {
            if (this.currentIndex > 0) {
                this.currentIndex -= 1
            } else {
                this.currentIndex = this.images.length - 1
            }
        },
        large_image(){
        }
    }
}
</script>

<style>
.slider_wrapper {
    display: flex;
}

.carousel-wrapper {
    outline: 1px solid rgba(44, 173, 181, .4);
    border-radius: 5px;
    position: relative;
    display: flex;
    width: 100%;
}

.carousel-wrapper img {
    border-radius: 5px;
    width: 100%;
    height: 100%;
    pointer-events: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
}

.slider_image {
    display: none;
}

.active_image {
    display: block;
}

.active_image img {
    width: 100%;
}

.slide {
    animation-duration: 0.4s;
    animation-name: Slide;
}


@keyframes Slide {
    0% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}




.image_center{
    position: absolute;
    left: 30%;
    height: 100%;
    width: 40%;
}
.left {
    position: absolute;
    left: 0;
    height: 100%;
    width: 30%;
}

.left svg {
    position: absolute;
    left: 0;
    margin-top: calc(50% - 40px);

}

.left:hover {
    background: linear-gradient(to left, rgba(18, 94, 117, 0), rgba(18, 94, 117, .3));
    cursor: pointer;
}

.right {
    position: absolute;
    right: 0;
    height: 100%;
    width: 30%;
}

.right svg {
    position: absolute;
    right: 0;
    top: 50%;
    height: 5rem;
    width: 5rem;
}

.right:hover {
    background: linear-gradient(to right, rgba(18, 94, 117, 0), rgba(18, 94, 117, .3));
    cursor: pointer;
}

.pagination {
    margin: 20px 0;
}

.pagination_item {
    margin: 0 1px;
    width: 15px;
    height: 15px;
    background-color: #c0c0c0;

    border-radius: 50%;
}

.pagination_item:hover {
    cursor: pointer;
}

.active_item {
    margin: 0 10px;
    transform: scale(1.3) translateY(-2px);
    background-color: #075668;
    border-radius: 50%;
}

/* стрелки */
.arrow-left-5,
.arrow-right-5 {
    display: none;
    width: 80px;
    height: 80px;
    cursor: pointer;
    fill: rgba(7, 86, 104, .7);

}

.arrow-left-5 {
    transform: rotate(90deg);
}

.arrow-right-5 {
    transform: rotate(270deg);
}



.left:hover .arrow-left-5 {
    display: block;
    transform: rotate(90deg) scale(1.1);
}

.right:hover .arrow-right-5 {
    display: block;
    transform: rotate(270deg) scale(1.1);
}



.tumb_group {
    height: auto;
    display: block;
    width: 25%;
    margin-left: 1%;
}

.tumb {
    height: 24.3%;
    margin-bottom: 0.4rem;
    outline: 0.1rem solid rgb(255, 255, 255);
    border-radius: 1%;
    opacity: .25;
}

.active_tumb {
    outline: 0.1rem solid rgb(255, 255, 255);
    opacity: 1;
}

.tumb:last-child {
    margin: 0;
}

.tumb img {
    height: 100%;
    border-radius: 1%;
    width: 100%;
    user-select: none;
}

.tumb:hover {
    cursor: pointer;
}

@media only screen and (max-width : 900px) {
    .slider_wrapper {
        padding: 0 1.5rem;
        display: block;
    }

    .tumb_group {
        display: flex;
        width: 100%;
        margin: 0.8rem 0;
        justify-content: space-between;
    }

    .tumb {
        margin-left: 5px;
    }

    .tumb:last-child {
        margin-left: 5px;
    }

    .tumb:first-child {
        margin: 0;
    }
}
</style>