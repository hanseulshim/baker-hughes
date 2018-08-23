<template>
  <v-app>
    <well-data />
  </v-app>
</template>

<script>
import WellData from './components/WellData';

export default {
  name: 'app',
  components: {
    WellData,
  },
};
</script>

<style lang="sass">
@import "./assets/styles/cards.sass"
@import "./assets/styles/button.sass"

body
  margin: 0
  font-size: 16px
</style>
