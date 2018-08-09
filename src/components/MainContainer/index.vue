<template>
  <div id="main-container">
    <header-container />
    <main-content />
    <!-- <cost-chart
      title="Cost over Time"
      x-label="Time (hrs)"
      x-data="cumulativeTime"
      chart-accessor="cumulative-time"
    />
    <cost-chart
      title="Cost over Depth"
      x-label="Depth (ft)"
      x-data="cumulativeDepth"
      chart-accessor="cumulative-depth"
    /> -->
  </div>
</template>

<script>
import HeaderContainer from './HeaderContainer';
import MainContent from './MainContent';
import CostChart from '../Charts/CostChart';

export default {
  name: 'main-container',
  components: {
    HeaderContainer,
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
