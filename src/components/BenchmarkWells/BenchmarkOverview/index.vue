<template>
  <div class="benchmark-wells-section-container">
    <benchmark-overview-title />
    <benchmark-overview-map />
    <benchmark-overview-table />
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
</style>
