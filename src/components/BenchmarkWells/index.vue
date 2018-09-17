<template>
<div id="benchmark-name-container">
  <div>
    <benchmark-name />
    <well-options />
    <v-card class="charts-container">
      <v-card-text>
        <benchmark-overview />
        <!-- <chart-title /> -->
        <!-- <charts-container /> -->
      </v-card-text>
    </v-card>
  </div>
</div>
</template>

<script>
import ChartTitle from './ChartTitle';
import ChartsContainer from './ChartsContainer';
import WellOptions from './WellOptions';
import BenchmarkName from './BenchmarkName';
import BenchmarkOverview from './BenchmarkOverview';

export default {
  name: 'benchmark-wells',
  components: {
    ChartTitle,
    ChartsContainer,
    WellOptions,
    BenchmarkName,
    BenchmarkOverview,
  },
};
</script>

<style lang="sass" scoped>
#benchmark-name-container
  margin: 5% auto
.charts-container
  padding: 1em
</style>
