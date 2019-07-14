<template>
  <div id="app">
    <Header />
    <Menu />
    <Content />
  </div>
</template>

<script>

import Header from './components/template/Header.vue'
import Menu from './components/template/Menu.vue'
import Content from './components/template/Content.vue'
export default {
  name: 'app',
  components: {
    Header, Menu, Content
  }
}
</script>

<style>
@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700,900);.preloader {
    width: 100%;
    height: 100%;
    top: 0;
    position: fixed;
    z-index: 99999;
    background: #fff
}
*{
  font-family: Rubik,sans-serif;
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  
  color: #2c3e50;
  height: 100vh;
  display: grid;
  grid-template-rows: 63px 1fr;
  grid-template-columns: 255px 1fr;
  grid-template-areas: 
    "header header"
    "menu content"
}
@media only screen and (max-width: 768px) {
  /* For mobile phones: */
  #app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  
  color: #2c3e50;
  height: 100vh;
  display: grid;
  grid-template-rows: 63px 1fr;
  grid-template-columns: 255px 1fr;
  grid-template-areas: 
    "header header"
    "content content"
}
}
body {
    background: #2f323e;
    margin: 0;
    overflow-x: hidden;
    color: #313131;
    font-weight: 300;
}
</style>
