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
              <div class="col-lg-6 col-md-6">
                <div class="row">
                  <div class="col-lg-6 col-sm-6 col-6">
                    <div @click="downloadLauncher()" class="main_button load_launcher_button justify-content-center">
                      <span>Скачать</span>
                      <div v-if="!launcher_downloading" class="download-logo"></div>
                      <span v-else class="launcher_loader"></span>
                    </div>
                  </div>
                  <div class="col-lg-6 col-sm-6 col-6">
                    <div @click="openPDF()" class="instruction">
                      Инструкция
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="scroll_block">
          <span>Узнать подробнее</span>
          <div @click="scrollDown()" class="scroll_down">
            <div class="scroll-svg"></div>
          </div>
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
    },
    openPDF() {
      window.open('./gui.pdf', '_blank')
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

.scroll_down {
  display: flex;
  justify-content: center;
}

.scroll_down:hover {
  cursor: pointer;
}

.scroll-svg {
  height: 48px;
  width: 48px;
  background: url('../assets/svg/scroll-down-svg.svg');
}

.scroll_down .scroll-svg {
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

.instruction {
  position: relative;
  border: 2px solid #075668;
  height: 100%;
  font-size: 22px;
  font-family: 'Rostelecom Basic Light', Helvetica, Arial, sans-serif;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  justify-content: center
}

.instruction:hover {
  cursor: pointer;
  border: 2px solid #0b8dab;
}

.description_header_text {
  padding: .5rem 0;
  color: white;
  height: 90vh;
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
  height: 90vh;
  width: 100%;
  z-index: -99;
  background-image: url('../assets/plane_backgound.jpg');
  background-color: linear-gradient(180deg, #075668 15%, rgb(212, 212, 212) 100%);
  background-size: cover;
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
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding-left: 3.5rem;
  padding-right: 3.5rem;
  position: relative;
}

/*лоадер для лаунчера*/
.launcher_loader {
  margin-left: 1rem;
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

a {
  color: white;
  text-decoration: none;
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

.download-logo {
  margin-left: 1rem;
  width: 25px;
  height: 25px;
  background: url("../assets/svg/download-svgrepo-com.svg") 0 0 no-repeat;
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

  .scroll_block {
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

  .instruction {
    font-size: 1rem;
  }



  .download-logo {
    margin-left: 1rem;
    width: 20px;
    height: 20px;
    color: white;
    background: url("../assets/svg/download-svgrepo-com.svg") 0 0 no-repeat;
  }
}

@media only screen and (max-width : 1300px) {
  .top_desc {
    margin: 0 1rem;
    padding: 1rem 2rem;
  }

  .top_desc p {
    font-size: 1.25rem;
  }

  .top_desc h1 {
    font-size: 1.5rem;
  }

  .scroll_block span {
    font-size: 1.25rem;
  }
}
</style>