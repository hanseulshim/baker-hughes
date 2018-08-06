<template>
  <div id="app">
    <div class="logo-container"><img src="./assets/logo.png"></div>
    <line-chart />
    <multi-line-chart />
    <div v-for="(well, index) in wellNameList" :key="index">
      <div>{{well}}</div>
    </div>
    <div>
      {{depthCostData}}
    </div>
  </div>
</template>

<script>
import LineChart from './components/LineChart';
import MultiLineChart from './components/MultiLineChart';

import data from './data/data.json';

export default {
  name: 'app',
  components: {
    LineChart,
    MultiLineChart,
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
      return this.data.map(well => ({
        cumulativeDepth: well.cumulativeDepth,
        [well.wellNameNo]: well.cumulativeCost,
      }));
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
