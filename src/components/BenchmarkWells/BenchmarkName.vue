<template>
  <div>
    <v-menu offset-y left min-width=0>
      <div class="well-title-container" slot="activator">
        <i class="material-icons">grid_on</i>
        <span class="well-title">{{benchmarkName}}</span>
        <i class="material-icons dropdown">arrow_drop_down</i>
      </div>
      <v-card>
        <v-card-text class="well-title-content-container">
          <div class="well-title-section">
            <span class="well-title-secondary">{{benchmarkName}}</span>
          </div>
        </v-card-text>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
export default {
  name: 'benchmark-name',
  computed: {
    benchmarkName() {
      return this.$store.state.well.benchmarkName;
    },
  },
};
</script>

<style lang="sass" scoped>
.well-title-container
  display: flex
  align-items: center
  font-size: 200%
  color: #9B9B9B
  width: 100%
.well-title
  margin: 0 1%
.material-icons
  font-size: 100%
.dropdown
  cursor: pointer
.well-title-secondary
  color: #5B5959
  font-size: 125%
.well-title-content-container
  display: flex
.well-title-section
  margin: 0 1em
.v-menu--inline
  display: block
</style>
