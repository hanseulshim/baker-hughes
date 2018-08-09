<template>
  <div id='app'>
    <Sidebar />
    <MainContainer />
  </div>
</template>

<script>
import Sidebar from './components/Sidebar';
import MainContainer from './components/MainContainer';

export default {
  name: 'App',
  components: {
    Sidebar,
    MainContainer,
  },
};
</script>

<style lang='sass'>
html, body, #app
  height: 100%
body
  margin: 0
  font-size: 100%
#app
  font-family: sans-serif
  display: flex
  margin: auto
</style>
