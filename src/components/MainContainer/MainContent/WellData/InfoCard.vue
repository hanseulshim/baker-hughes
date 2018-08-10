<template>
  <v-card class="card-container">
    <v-card-title class="card-container-title-row">
      <span class="title">{{selectedWell.wellNameNo}}</span>
    </v-card-title>
    <v-card-text>
      <div class="well-data-info-container">
        <i class="material-icons">attach_money</i>
        <div class="section">
          <span class="section-title">Cost</span>
          <span class="section-text"><i class="material-icons">attach_money</i>157,000</span>
        </div>
        <div class="section">
          <span class="section-title">Optimized</span>
          <span class="section-text"><i class="material-icons">attach_money</i>127,000</span>
          <span>= Save <i class="material-icons">attach_money</i>30,000</span>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'info-card',
  computed: {
    selectedWell() {
      return this.$store.getters.selectedWell;
    },
  },
};
</script>

<style lang="sass" scoped>
.well-data-info-container
  display: flex
  .section
    display: flex
    flex-direction: column
    .section-title
      font-size: 125%
    .section-text
      font-size: 180%
    .material-icons
      font-size: 100%
</style>
