<template>
  <div id='sidebar'>
    <div class='sidebar-title'>Phantom</div>
    <MenuContainer />
  </div>
</template>

<script>
import MenuContainer from './MenuContainer';

export default {
  name: 'Sidebar',
  components: {
    MenuContainer,
  },
};
</script>

<style lang="sass">
#sidebar
  background-color: #3E3E3E
  width: 20%
  min-width: 250px
  box-sizing: border-box
.sidebar-title
  color: #FFF
  font-size: 2em
  margin: 1em 1em 1em 20px
</style>

