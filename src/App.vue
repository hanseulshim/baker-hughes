<template>
  <div id="app">
    <cost-depth-chart :depth-cost-data="depthCostData" :data="data" />
    <div v-for="(well, index) in wellNameList" :key="index">
      <div>{{well}}</div>
    </div>
  </div>
</template>

<script>
import CostDepthChart from './components/CostDepthChart';

import data from './data/data.json';

export default {
  name: 'app',
  components: {
    CostDepthChart,
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
  },
};
</script>

<style lang="sass" scoped>
#app
  font-family: 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  color: #2c3e50
  margin-top: 60px
  display: flex
  flex-direction: column

.logo-container
  margin: auto
</style>
