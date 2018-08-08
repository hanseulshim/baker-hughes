<template>
  <div>
    <Header />
    <CostChart
      title='Cost over Time'
      x-label='Time (hrs)'
      x-data='cumulativeTime'
      chart-accessor='cumulative-time'
    />
    <CostChart
      title='Cost over Depth'
      x-label='Depth (ft)'
      x-data='cumulativeDepth'
      chart-accessor='cumulative-depth'
    />
  </div>
</template>

<script>
import Header from './Header';
import CostChart from './CostChart';

export default {
  name: 'MainContainer',
  components: {
    Header,
    CostChart,
  },
};
</script>
