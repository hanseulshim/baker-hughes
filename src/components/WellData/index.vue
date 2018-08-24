<template>
<div id="well-data-container">
  <div>
    <well-title
      :current-view="currentView"
      @changeView="changeView"
    />
    <benchmark-title />
    <well-options />
    <v-card>
      <v-card-text>
        <well-info-container />
        <toggle-compare
          :current-compare="currentCompare"
          @toggleCompare="toggleCompare"
        />
        <chart-title />
        <line-chart-container />
      </v-card-text>
    </v-card>
  </div>
</div>
</template>

<script>
import BenchmarkTitle from './BenchmarkTitle';
import ChartTitle from './ChartTitle';
import LineChartContainer from './LineChartContainer';
import ToggleCompare from './ToggleCompare';
import WellInfoContainer from './WellInfoContainer';
import WellOptions from './WellOptions';
import WellTitle from './WellTitle';

export default {
  name: 'well-data',
  components: {
    BenchmarkTitle,
    ChartTitle,
    LineChartContainer,
    ToggleCompare,
    WellInfoContainer,
    WellOptions,
    WellTitle,
  },
  data() {
    return {
      currentView: 'Overview',
      currentCompare: 'time',
    };
  },
  methods: {
    changeView(view) {
      this.currentView = view;
    },
    toggleCompare(compare) {
      this.currentCompare = compare;
    },
  },
};
</script>

<style lang="sass" scoped>
#well-data-container
  margin: 5% auto
</style>
