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
        <line-chart-container />
      </v-card-text>
    </v-card>
  </div>
</div>
</template>

<script>
import BenchmarkTitle from './BenchmarkTitle';
import LineChartContainer from './LineChartContainer';
import WellInfoContainer from './WellInfoContainer';
import WellOptions from './WellOptions';
import WellTitle from './WellTitle';

export default {
  name: 'well-data',
  components: {
    BenchmarkTitle,
    LineChartContainer,
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
</style>
