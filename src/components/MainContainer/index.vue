<template>
  <div id='main-container'>
    <Header />
    <MainContent />
    <!-- <CostChart
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
    /> -->
  </div>
</template>

<script>
import Header from './Header';
import MainContent from './MainContent';
import CostChart from '../Charts/CostChart';

export default {
  name: 'MainContainer',
  components: {
    Header,
    MainContent,
    CostChart,
  },
};
</script>

<style lang="sass">
#main-container
  flex-grow: 1
  background: #F1F6F9
</style>
