<template>
  <div class="benchmark-wells-section-container">
    <benchmark-overview-title class="wells-section-spacer" />
    <benchmark-overview-map />
    <benchmark-overview-table class="wells-section-spacer" />
  </div>
</template>

<script>
import BenchmarkOverviewMap from './BenchmarkOverviewMap';
import BenchmarkOverviewTable from './BenchmarkOverviewTable';
import BenchmarkOverviewTitle from './BenchmarkOverviewTitle';

export default {
  name: 'benchmark-overview',
  components: {
    BenchmarkOverviewMap,
    BenchmarkOverviewTable,
    BenchmarkOverviewTitle,
  },
};
</script>

<style lang="sass">
.benchmark-wells-section-container
  margin-top: 2em
.wells-section-spacer
  padding: 0 2em
</style>
