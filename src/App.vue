<template>
  <v-app>
    <div id="app">
      <sidebar />
      <main-container />
    </div>
  </v-app>
</template>

<script>
import Sidebar from './components/Sidebar';
import MainContainer from './components/MainContainer';

export default {
  name: 'app',
  components: {
    Sidebar,
    MainContainer,
  },
};
</script>

<style lang="sass">
@import "./assets/styles/cards.sass"

html, body, #app
  height: 100%
body
  margin: 0
  font-size: 100%
#app
  font-family: sans-serif
  display: flex
  margin: auto
  width: 100%
</style>
