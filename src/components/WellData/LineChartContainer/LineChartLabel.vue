<template>
  <g class='labels'>
    <text
      v-if="currentCompare"
      class="chart-label"
      text-anchor="middle"
      :x="layout.width / 2"
      :y="-(layout.marginTop / 2)"
    >
      Cumulative Time (hrs.)
    </text>
    <text
      v-else
      class="chart-label"
      text-anchor="middle"
      :x="layout.width / 2"
      :y="-(layout.marginTop / 2)"
    >
      Cost (USD)
    </text>
    <text
      class="chart-label"
      text-anchor="middle"
      transform="rotate(-90)"
      :x="-(layout.height / 2)"
      :y="-layout.marginTop"
    >
      Depth (ft.)
    </text>
    <text
      class="chart-line-label"
      :x="scale.x(xMax)"
      :y="scale.y(yMax) + 10"
      text-anchor="middle"
    >
      <tspan :x="leftPosition">|</tspan>
      <tspan v-if="currentCompare" :x="leftPosition" dy="1em">Observed Time</tspan>
      <tspan v-else :x="leftPosition" dy="1em">Observed Cost</tspan>
      <tspan v-if="currentCompare" :x="leftPosition" dy="1em">{{Math.round(xMax)}} hrs</tspan>
      <tspan v-else :x="leftPosition" dy="1em">${{Math.round(xMax / 1000)}}k</tspan>
    </text>
    <text
      class="chart-line-label"
      :x="scale.x(benchmarkMax)"
      :y="scale.y(yMax) + 10"
      text-anchor="middle"
    >
      <tspan :x="scale.x(benchmarkMax)">|</tspan>
      <tspan v-if="currentCompare" :x="scale.x(benchmarkMax)" dy="1em">Benchmark Time</tspan>
      <tspan v-else :x="scale.x(benchmarkMax)" dy="1em">Benchmark Cost</tspan>
      <tspan
        v-if="currentCompare"
        :x="scale.x(benchmarkMax)"
        dy="1em"
      >
        {{Math.round(benchmarkMax)}} hrs
      </tspan>
      <tspan
        v-else
        :x="scale.x(benchmarkMax)"
        dy="1em"
      >
        ${{Math.round(benchmarkMax / 1000)}}k
      </tspan>
    </text>
  </g>
</template>

<script>
import * as d3 from 'd3';

export default {
  name: 'line-chart-label',
  props: {
    layout: {
      type: Object,
      required: true,
    },
    scale: {
      type: Object,
      required: true,
    },
  },
  computed: {
    currentCompare() {
      return this.$store.state.currentCompare === 'time';
    },
    benchmarkMax() {
      return d3.max(this.$store.getters.benchmarks,
        benchmark => benchmark.value);
    },
    leftPosition() {
      return this.scale.x(this.xMax) + 3;
    },
    xMax() {
      return this.$store.getters.xMax;
    },
    yMax() {
      return this.$store.getters.maxDepth;
    },
  },
};
</script>

<style lang="sass" scoped>
.chart-label
  font-size: 60%
  font-weight: bold
.chart-line-label
  font-size: 50%
</style>
