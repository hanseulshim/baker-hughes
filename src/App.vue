<template>
  <div id='app'>
    <cost-chart
      :sortedData='timeCostData'
      :rawData='data'
      title='Cost over Time'
      xLabel='Time (hrs)'
      xData='cumulativeTime'
      chartAccessor='cumulative-time'
    />
    <cost-chart
      :sortedData='depthCostData'
      :rawData='data'
      title='Cost over Depth'
      xLabel='Depth (ft)'
      xData='cumulativeDepth'
      chartAccessor='cumulative-depth'
    />
  </div>
</template>

<script>
import CostChart from './components/CostChart';

import data from './data/data.json';

export default {
  name: 'app',
  components: {
    CostChart,
  },
  data() {
    return {
      data,
    };
  },
  computed: {
    wellNameList() {
      return this.data.filter((v, i, a) =>
        a.findIndex(value => value.wellNameNo === v.wellNameNo) === i)
        .map(x => (x.wellNameNo));
    },
    depthCostData() {
      return this.wellNameList.map((wellNameNo) => {
        const dataArray =
          this.data.filter(well => well.wellNameNo === wellNameNo)
            .map(well => ({
              cumulativeDepth: well.cumulativeDepth,
              cumulativeCost: well.cumulativeCost,
            }));
        return {
          wellNameNo,
          data: dataArray,
        };
      });
    },
    timeCostData() {
      return this.wellNameList.map((wellNameNo) => {
        const dataArray =
          this.data.filter(well => well.wellNameNo === wellNameNo)
            .map(well => ({
              cumulativeTime: well.cumulativeTime,
              cumulativeCost: well.cumulativeCost,
            }));
        return {
          wellNameNo,
          data: dataArray,
        };
      });
    },
  },
};
</script>

<style lang='sass' scoped>
#app
  font-family: 'Avenir', Helvetica, Arial, sans-serif
  color: #2c3e50
  margin-top: 60px
  display: flex
  flex-wrap: wrap

.logo-container
  margin: auto
</style>
