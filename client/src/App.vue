<template>
    <MainWrap></MainWrap>
</template>

<script>
import MainWrap from './pages/MainWrap.vue';
export default {
  components:{
    MainWrap,
  }
}
</script>

<style>
#app {
  font-family: 'Rostelecom Basic Light', Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #212529;
  padding: 0;
  margin: 0;
  scrollbar-color: green yellow;
}

@font-face {
	font-family: 'Rostelecom Basic Light'; 
	src: local('Rostelecom Basic Light'),url(../public/fonts/rostelecombasis_light.otf); 
}




</style>
