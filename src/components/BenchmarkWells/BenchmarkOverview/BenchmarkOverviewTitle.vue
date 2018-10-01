<template>
  <div>
    <div class="benchmark-wells-section-title">
      Benchmark Overview
    </div>
    <div class="benchmark-wells-section-subtitle">{{benchmarkName}}</div>
  </div>
</template>

<script>
export default {
  name: 'benchmark-overview-title',
  computed: {
    benchmarkName() {
      return this.$store.state.well.benchmarkName;
    },
  },
};
</script>

<style lang="sass">
.benchmark-wells-section-title
  font-size: 160%
  font-weight: bold
  color: #5B5959
  margin-bottom: .5em
.benchmark-wells-section-subtitle
  margin-bottom: 1em
</style>
