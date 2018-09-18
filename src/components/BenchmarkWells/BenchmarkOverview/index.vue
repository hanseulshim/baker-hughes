<template>
  <div class="benchmark-wells-section-container">
    <benchmark-overview-title />
    <benchmark-overview-table />
  </div>
</template>

<script>
import BenchmarkOverviewTable from './BenchmarkOverviewTable';
import BenchmarkOverviewTitle from './BenchmarkOverviewTitle';

export default {
  name: 'benchmark-overview',
  components: {
    BenchmarkOverviewTable,
    BenchmarkOverviewTitle,
  },
};
</script>

<style lang="sass">
.benchmark-wells-section-container
  margin-top: 2em
</style>
