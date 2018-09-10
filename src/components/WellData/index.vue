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
        <toggle-compare />
        <chart-title />
        <div class="charts-container">
          <line-chart-container />
          <area-chart-container />
        </div>
      </v-card-text>
    </v-card>
  </div>
</div>
</template>

<script>
import AreaChartContainer from './AreaChartContainer';
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
    AreaChartContainer,
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
    };
  },
  methods: {
    changeView(view) {
      this.currentView = view;
    },
  },
};
</script>

<style lang="sass" scoped>
#well-data-container
  margin: 5% auto
.charts-container
  display: flex
  padding: 1em
</style>
