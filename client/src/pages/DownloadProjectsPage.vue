<template>
  <div class="download_back">


    <div class="description_header_wrapper">
      <div class="description_header_background"></div>
      <div class="container description_header_text">
        <div></div>
        <div class="desc top_desc">
          <h1 class="">Лаунчер для автоматизированной обучающей системы для подготовки специалистов
          </h1>
          <p class="">Компания ООО «ЭСВО» обладает наработками, которые позволили создать обширный технический задел в
            области
            создания учебных компьютерных классов (УКК) для различных направлений деятельности, эксплуатируемые в
            государственных и гражданских структурах.
            Специалистами предприятия разработано приложение (лаунчер), позволяющее устанавливать демонстрационные
            версии
            УКК нового поколения, прямо к себе на персональный компьютер, в ознакомительных целях.
            Начать свое знакомство с нашими системами можно уже сейчас!</p>
          <div class="button_download_group">
            <div class="row justify-content-center">
              <div class="col-lg-6">
                <div class="row">
                  <div class="col-lg-6 col-sm-6 col-6">
                    <div @click="downloadLauncher()" class="main_button load_launcher_button">Скачать
                      <span v-if="launcher_downloading" class="launcher_loader"></span>
                    </div>
                  </div>
                  <div class="col-lg-6 col-sm-6 col-6">
                    <div class="main_button">Инструкция</div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>



        <div @click="scrollDown()" class="scroll_down">
          <svg width="48px" height="48px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
            stroke="#000000">
            <g id="SVGRepo_bgCarrier" stroke-width="0" />
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
            <g id="SVGRepo_iconCarrier">
              <path d="M19 5L12.7071 11.2929C12.3166 11.6834 11.6834 11.6834 11.2929 11.2929L5 5" stroke="#ffffff"
                stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M19 13L12.7071 19.2929C12.3166 19.6834 11.6834 19.6834 11.2929 19.2929L5 13" stroke="#ffffff"
                stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </g>
          </svg>
        </div>
      </div>
    </div>

    <div ref="slider" class="dowload_wrapper">
      <SliderDownLoadPage class="slider_component"></SliderDownLoadPage>
    </div>
    <div class="container desc">
      <p class="">Компания ООО «ЭСВО» обладает наработками,
        которые позволили создать обширный технический задел в
        области
        создания учебных компьютерных классов (УКК) для различных направлений деятельности, эксплуатируемые в
        государственных и гражданских структурах.
        Специалистами предприятия разработано приложение (лаунчер), позволяющее устанавливать демонстрационные
        версии
        УКК нового поколения, прямо к себе на персональный компьютер, в ознакомительных целях.
        Начать свое знакомство с нашими системами можно уже сейчас!</p>
    </div>



  </div>
</template>

<script>

import config from '../config';
import store from '../store';
import SliderDownLoadPage from '@/components/SliderDownLoadPage.vue';

export default {
  data() {
    return {
      loadPage: false,
      images: [
        { src: require('../assets/slider/projects1.png') },
        { src: require('../assets/slider/projects2.png') },
        { src: require('../assets/slider/projects3.png') },
        { src: require('../assets/slider/projects4.png') }
      ],
      launcher_downloading: false
    }
  },
  methods: {
    async downloadLauncher() {
      this.launcher_downloading = true
      const response = await fetch(config.SERVER_HOST + "/launcher/downloadLauncher")

      if (response.status === 200) {
        const blob = await response.blob()
        const downloadURL = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = downloadURL;
        link.download = "setup.exe"
        document.body.appendChild(link)
        link.click()
        link.remove()
        this.launcher_downloading = false
        return
      }
      if (response.status === 400) {
        alert("Не удалось найти файл")
      }
      this.launcher_downloading = false
    },
    scrollDown() {
      this.$refs.slider.scrollIntoView({ behavior: 'smooth' });
    }
  },
  mounted() {
    store.dispatch("setLinkListAction", [])
  },
  components: {
    SliderDownLoadPage
  }
}
</script>

<style scoped>
.top_desc {
  background-color: rgba(0, 0, 0, .5);
  border-radius: 1rem;
  padding: 3rem;
}

.top_desc h1 {
  border-bottom: 1px solid;
  padding: 1rem;
  text-align: center;
  font-size: 2rem;
}

.scroll_down:hover {
  cursor: pointer;
}

.scroll_down svg {
  animation: scroll_down 5s infinite;
}

@keyframes scroll_down {
  0% {
    transform: translateY(0px);
  }

  10% {
    transform: translateY(3px);
  }

  20% {
    transform: translateY(0px);
  }

  30% {
    transform: translateY(3px);
  }

  40% {
    transform: translateY(0px);
  }
}

.download_back {

  overflow: auto;
  overflow-x: hidden;
}

.description_header_text {
  padding: 5.5rem 0;
  color: white;
  height: 92vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.description_header_text p {
  font-size: 24px;
  text-align: justify;
}

.desc p {
  color: white;
  font-size: 1.5rem;

  font-family: 'Rostelecom Basic Light', Helvetica, Arial, sans-serif;
}

.description_header_wrapper {
  position: relative;
}

.description_header_background {
  position: absolute;
  height: 92vh;
  width: 100%;
  z-index: -99;
  background-image: url('../assets/plane_backgound.png');
  background-color: linear-gradient(180deg, #075668 15%, rgb(212, 212, 212) 100%);
  background-size: cover;
  /*animation: scrollBg 40s linear forwards infinite;*/
  background-repeat: repeat-x;
  background-repeat: repeat-y;
}

@keyframes scrollBg {
  0% {
    transform: translateX(0px);
  }

  50% {
    transform: translateX(-100px);
  }

  100% {
    transform: translateX(0px);
  }
}


.dowload_wrapper {
  padding: 5rem 0;
  /*background: linear-gradient(180deg, #075668 15%, rgb(212, 212, 212) 100%);*/
}

.launcher_description {
  margin-top: 1.5rem;
  color: aliceblue;
  font-family: 'Rostelecom Basic Light', Helvetica, Arial, sans-serif;
  text-align: justify
}

.launcher_description h1 {
  text-align: center;
}

.button_download_group {
  margin: 1.5rem auto;

}

.load_launcher_button {
  display: flex;
  justify-content: center;
}

/*лоадер для лаунчера*/
.launcher_loader {
  margin-left: 15px;
  content: "";
  display: block;
  width: 25px;
  height: 25px;
  border: 3px solid #ffffff;
  border-color: #fff transparent #fff transparent;
  border-radius: 50%;
  animation: loader_animation 1500ms linear infinite;
}

@keyframes loader_animation {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

/*лоадер страницы*/

.preloader {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: #212529;
  z-index: 1001;
}

.preloader__row {
  position: relative;
  margin: auto;
  top: 45%;
  width: 10%;
  height: 10%;
  text-align: center;
  animation: preloader-rotate 2s infinite linear;
}

.preloader__item {
  position: absolute;
  display: inline-block;
  top: 0;
  background-color: #337ab7;
  border-radius: 100%;
  width: 35px;
  height: 35px;
  animation: preloader-bounce 2s infinite ease-in-out;
}

.preloader__item:last-child {
  top: auto;
  bottom: 0;
  animation-delay: -1s;
}

@keyframes preloader-rotate {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes preloader-bounce {

  0%,
  100% {
    transform: scale(0);
  }

  50% {
    transform: scale(1);
  }
}

.loaded_hiding .preloader {
  transition: 0.3s opacity;
  opacity: 0;
}

.loaded .preloader {
  display: none;
}

@media only screen and (max-width : 2000px) {
  .launcher_description {
    font-size: 1.8rem;
  }
}

@media only screen and (max-width : 1500px) {
  .launcher_description {
    font-size: 1.5rem;
  }
}

@media only screen and (max-width : 1200px) {

  .launcher_description {
    font-size: 1.3rem;
  }

  .description_header_background {
    position: relative;
    height: auto;
  }

  .description_header_text {
    padding: 5.5rem 0;
    color: white;
    height: auto;
  }

  .scroll_down {
    display: none;
  }
}

@media only screen and (max-width : 1000px) {
  .dowload_wrapper {
    padding: 1.5rem 0;
  }

  .launcher_description {
    font-size: 1rem;
  }

  .top_desc {
    margin: 0 1rem;
    padding: 0;
  }

  .top_desc h1 {
    font-size: 1.5rem;
  }


  .desc p {
    font-size: 1rem;
    padding: 0 1rem;
    text-align: justify;
  }

  .description_header_text {
    margin-top: 1rem;
    padding: 0;
  }

  .button_download_group {
    margin: 0 1.5rem;
  }

  .main_button {
    font-size: 1rem;
  }
}

@media only screen and (max-width : 1300px) {
  .top_desc {
    margin: 0 1rem;
    padding: 1rem 2rem;
  }
}
</style>