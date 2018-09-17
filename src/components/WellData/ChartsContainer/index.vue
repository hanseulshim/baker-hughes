<template>
  <div class="charts-container">
    <pull-bit-chart-container
      :vertical-layout="verticalLayout"
      :y-scale="yScale"
    />
    <line-chart-container
      :vertical-layout="verticalLayout"
      :y-scale="yScale"
    />
    <area-chart-container
      :vertical-layout="verticalLayout"
      :y-scale="yScale"
    />
  </div>
</template>

<script>
import * as d3 from 'd3';
import AreaChartContainer from './AreaChartContainer';
import LineChartContainer from './LineChartContainer';
import PullBitChartContainer from './PullBitChartContainer';

export default {
  name: 'charts-container',
  components: {
    AreaChartContainer,
    LineChartContainer,
    PullBitChartContainer,
  },
  data() {
    return {
      verticalLayout: {
        height: 600,
        marginTop: 30,
        marginBottom: 50,
      },
    };
  },
  computed: {
    yMax() {
      return this.$store.getters.maxDepth;
    },
  },
  methods: {
    yScale() {
      return d3.scaleLinear()
        .domain([0, this.yMax])
        .range([0, this.verticalLayout.height])
        .nice();
    },
  },
};
</script>

<style lang="sass">
.charts-container
  display: flex
  padding: 1em
</style>
