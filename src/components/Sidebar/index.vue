<template>
  <div id='sidebar'>
    <div class='sidebar-title'>Phantom</div>
    <menu-container />
  </div>
</template>

<script>
import MenuContainer from './MenuContainer';

export default {
  name: 'sidebar',
  components: {
    MenuContainer,
  },
};
</script>

<style lang="sass">
#sidebar
  background-color: #3E3E3E
  width: 25%
  box-sizing: border-box
.sidebar-title
  color: #FFF
  font-size: 150%
  margin: 5%
</style>
