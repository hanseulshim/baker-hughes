<template>
  <div class="chart-title-container">
    <span class="chart-title">Well Performance of {{wellName}}</span>
    <div class="chart-legend-container">
      <div class="chart-legend">
        <img src="/static/bitChange.png" />
        <span>Observed Bit Change</span>
      </div>
      <div class="chart-legend">
        <img src="/static/well.png" />
        <span>Observed Well</span>
      </div>
      <div class="chart-legend">
        <img src="/static/benchmark.png" />
        <span>Benchmark Well</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'chart-title',
  computed: {
    wellName() {
      return this.$store.state.well.currentWell.wellName;
    },
  },
};
</script>

<style lang="sass">
.chart-title-container
  display: flex
  justify-content: space-between
  align-items: center
  padding: 1em
.chart-title
  color: #5B5959
  font-size: 162.5%
  font-weight: bold
  margin-right: 2em
.chart-legend-container
  display: flex
  justify-content: flex-end
  flex-grow: 1
.chart-legend
  margin: 0 1em
  display: flex
  align-items: center
  img
    margin-right: 1em
</style>
