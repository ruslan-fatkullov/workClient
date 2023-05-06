<template>
  <div class="download_back">
    <div class="container">

      <div class="launcher_description">
        <p>Компания ООО «ЭСВО» обладает наработками, которые позволили создать обширный технический задел в области
          создания учебных компьютерных классов (УКК) для различных направлений деятельности, эксплуатируемые в
          государственных и гражданских структурах.
          Специалистами предприятия разработано приложение (лаунчер), позволяющее устанавливать демонстрационные
          версии
          УКК нового поколения, прямо к себе на персональный компьютер, в ознакомительных целях.
          Начать свое знакомство с нашими системами можно уже сейчас!</p>
      </div>
    </div>
    <div class="dowload_wrapper">
      <SliderDownLoadPage class="slider_component"></SliderDownLoadPage>
    </div>

    <div class="container button_download_group">
      <div class="row">
        <div class="col-md-6 col-sm-6 col-6">
          <div @click="downloadLauncher()" class="main_button">Скачать</div>
        </div>
        <div class="col-md-6 col-sm-6 col-6">
          <div class="main_button">Инструкция</div>
        </div>
      </div>
    </div>

    <!--<p>Компания ООО «ЭСВО» обладает наработками, которые позволили создать обширный технический задел в области
              создания учебных компьютерных классов (УКК) для различных направлений деятельности, эксплуатируемые в
              государственных и гражданских структурах.
              Специалистами предприятия разработано приложение (лаунчер), позволяющее устанавливать демонстрационные
              версии
              УКК нового поколения, прямо к себе на персональный компьютер, в ознакомительных целях.
              Начать свое знакомство с нашими системами можно уже сейчас!</p>

            <div class="row">
              <div class="col-md-6 col-sm-6 col-6">
                <div @click="downloadLauncher()" class="main_button">Скачать</div>
              </div>
              <div class="col-md-6 col-sm-6 col-6">
                <div class="main_button">Инструкция</div>
              </div>
            </div>-->
  </div>
</template>

<script>
import config from '../config';
import store from '../store';
import SliderDownLoadPage from '@/components/SliderDownLoadPage.vue';

export default {
  data() {
    return {
      images: [
        { src: require('../assets/slider/projects1.png') },
        { src: require('../assets/slider/projects2.png') },
        { src: require('../assets/slider/projects3.png') },
        { src: require('../assets/slider/projects4.png') }
      ]
    }
  },
  methods: {
    async downloadLauncher() {
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
        return
      }
      if (response.status === 400) {
        alert("Не удалось найти файл")
      }


    }
  },
  showInstruction() {
  },
  mounted() {
    store.dispatch("setLinkListAction", [])
    //store.dispatch("setLinkListAction", [{ label: "Главная", link: "/" }, { label: "Скачать лаунчер", link: "/downloadProjects" }])
  },
  components: {
    SliderDownLoadPage
  }
}
</script>

<style scoped> .dowload_wrapper {
   margin-top: 1.5rem;
 }

 .launcher_description {
  margin-top: 1.5rem;
   color: aliceblue;
   font-family: 'Rostelecom Basic Light', Helvetica, Arial, sans-serif;
   text-align: justify
 }

 .col-md-12 p {
   font-size: 16px;
 }

 .col-lg-4 p {
   font-size: 18px;
 }

 .col-xl-4 p {
   font-size: 20px;
 }

 .col-xxl-4 p {
   font-size: 15px;
 }
 .button_download_group{
  margin-top: 1.5rem;
 }
</style>