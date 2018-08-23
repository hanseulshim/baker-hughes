<template>
<div id="well-data-container">
  <div>
    <well-title
      :current-view="currentView"
      @changeView="changeView"
    />
    <benchmark-title />
    <well-options
      :operating-cost="operatingCost"
      :fixed-cost="fixedCost"
      :trip-rate="tripRate"
      :trip-rate-unit="tripRateUnit"
      @updateWellOptions="updateWellOptions"
    />
    <v-card>
      <line-chart-container />
    </v-card>
  </div>
</div>
</template>

<script>
import WellOptions from './WellOptions';
import LineChartContainer from './LineChartContainer';
import WellTitle from './WellTitle';
import BenchmarkTitle from './BenchmarkTitle';

export default {
  name: 'well-data',
  components: {
    WellOptions,
    LineChartContainer,
    WellTitle,
    BenchmarkTitle,
  },
  data() {
    return {
      currentView: 'Overview',
      operatingCost: 2500,
      fixedCost: 15000,
      tripRate: 1000,
      tripRateUnit: 'ft',
    };
  },
  methods: {
    changeView(view) {
      this.currentView = view;
    },
    updateWellOptions(options) {
      this.operatingCost = options.operatingCost;
      this.fixedCost = options.fixedCost;
      this.tripRate = options.tripRate;
      this.tripRateUnit = options.tripRateUnit;
    },
  },
};
</script>

<style lang="sass" scoped>
#well-data-container
  margin: 5% auto
</style>
