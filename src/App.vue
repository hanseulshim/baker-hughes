<template>
  <div id='app'>
    <header />
    <cost-chart
      title='Cost over Time'
      xLabel='Time (hrs)'
      xData='cumulativeTime'
      chartAccessor='cumulative-time'
    />
    <cost-chart
      title='Cost over Depth'
      xLabel='Depth (ft)'
      xData='cumulativeDepth'
      chartAccessor='cumulative-depth'
    />
  </div>
</template>

<script>
import CostChart from './components/CostChart';
import Header from './components/Header';

export default {
  name: 'app',
  components: {
    CostChart,
    Header,
  },
};
</script>

<style lang='sass' scoped>
#app
  width: 1280px
  font-family: sans-serif
</style>
