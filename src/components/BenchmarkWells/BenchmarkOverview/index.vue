<template>
  <div>
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
