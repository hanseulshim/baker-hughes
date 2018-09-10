<template>
  <div class="charts-container">
    <line-chart-container />
    <area-chart-container />
  </div>
</template>

<script>
import AreaChartContainer from '../AreaChartContainer';
import LineChartContainer from '../LineChartContainer';

export default {
  name: 'charts-container',
  components: {
    AreaChartContainer,
    LineChartContainer,
  },
};
</script>

<style lang="sass">
.charts-container
  display: flex
  padding: 1em
</style>
