<template>
<div id="benchmark-name-container">
  <div>
    <benchmark-name />
    <well-options />
    <v-card class="charts-container">
      <v-card-text>
        <benchmark-overview />
        <wells-overview />
      </v-card-text>
    </v-card>
  </div>
</div>
</template>

<script>
import BenchmarkName from './BenchmarkName';
import BenchmarkOverview from './BenchmarkOverview';
import WellOptions from './WellOptions';
import WellsOverview from './WellsOverview';

export default {
  name: 'benchmark-wells',
  components: {
    BenchmarkName,
    BenchmarkOverview,
    WellOptions,
    WellsOverview,
  },
};
</script>

<style lang="sass" scoped>
#benchmark-name-container
  margin: 5% auto
.charts-container
  padding: 0 1em
</style>
