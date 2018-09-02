<template>
  <v-app>
    <well-data v-if="validated" />
    <password
      v-else
      @submit="validatePassword"
    />
  </v-app>
</template>

<script>
import Password from './components/Password';
import WellData from './components/WellData';

export default {
  name: 'app',
  data() {
    return {
      validated: false,
    };
  },
  components: {
    Password,
    WellData,
  },
  methods: {
    validatePassword(password) {
      this.validated = password === 'bakerhughes0.1';
    },
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
