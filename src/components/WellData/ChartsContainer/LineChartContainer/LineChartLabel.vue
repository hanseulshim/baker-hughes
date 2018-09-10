<template>
  <g class='labels'>
    <text
      class="chart-label"
      text-anchor="middle"
      transform="rotate(-90)"
      :x="-(layout.height / 2)"
      :y="-(layout.marginTop + 10)"
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
      <tspan v-else :x="leftPosition" dy="1em">${{observedCost}}</tspan>
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
        ${{benchmarkCost}}
      </tspan>
    </text>
  </g>
</template>

<script>
import numeral from 'numeral';
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
      return this.$store.state.options.currentCompare === 'time';
    },
    benchmarkMax() {
      return d3.max(this.$store.getters.benchmarks,
        benchmark => benchmark.value);
    },
    benchmarkCost() {
      return numeral(this.benchmarkMax).format('0.0a');
    },
    leftPosition() {
      return this.scale.x(this.xMax) + 3;
    },
    observedCost() {
      return numeral(this.xMax).format('0.0a');
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

<style lang="sass">
.chart-label
  font-size: 100%
  font-weight: bold
.chart-line-label
  font-size: 80%
</style>
