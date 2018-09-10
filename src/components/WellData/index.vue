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
        <charts-container />
      </v-card-text>
    </v-card>
  </div>
</div>
</template>

<script>
import BenchmarkTitle from './BenchmarkTitle';
import ChartTitle from './ChartTitle';
import ChartsContainer from './ChartsContainer';
import ToggleCompare from './ToggleCompare';
import WellInfoContainer from './WellInfoContainer';
import WellOptions from './WellOptions';
import WellTitle from './WellTitle';

export default {
  name: 'well-data',
  components: {
    BenchmarkTitle,
    ChartTitle,
    ChartsContainer,
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
