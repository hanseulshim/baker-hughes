<template>
  <div id='app'>
    <Sidebar />
    <MainContainer />
  </div>
</template>

<script>
import Sidebar from './components/Sidebar/Sidebar';
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
body
  margin: 0
  font-size: 12px
#app
  font-family: sans-serif
  display: flex
  max-width: 1440px
  margin: auto
</style>
