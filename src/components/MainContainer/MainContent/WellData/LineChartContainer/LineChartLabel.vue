<template>
  <g class='labels'>
    <text
      class="chart-label"
      text-anchor="middle"
      :x="layout.width / 2"
      :y="-(layout.marginTop / 2)"
    >
      Cumulative Time (hrs.)
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
      <tspan :x="leftPosition" dy="1em">Observed Time</tspan>
      <tspan :x="leftPosition" dy="1em">{{Math.round(xMax)}} hrs</tspan>
    </text>
    <text
      class="chart-line-label"
      :x="scale.x(benchmarkMax)"
      :y="scale.y(yMax) + 10"
      text-anchor="middle"
    >
      <tspan :x="scale.x(benchmarkMax)">|</tspan>
      <tspan :x="scale.x(benchmarkMax)" dy="1em">Benchmark Time</tspan>
      <tspan :x="scale.x(benchmarkMax)" dy="1em">{{Math.round(benchmarkMax)}} hrs</tspan>
    </text>
  </g>
</template>

<script>
import * as d3 from 'd3';

export default {
  name: 'line-chart-label',
  props: {
    benchmarkMax: {
      type: Number,
      required: true,
    },
    layout: {
      type: Object,
      required: true,
    },
    scale: {
      type: Object,
      required: true,
    },
    xMax: {
      type: Number,
      required: true,
    },
    yMax: {
      type: Number,
      required: true,
    },
  },
  mounted() {
    this.drawLabels();
  },
  computed: {
    leftPosition() {
      return this.scale.x(this.xMax) + 3;
    },
  },
  methods: {
    drawLabels() {
      d3.select(this.$refs.wellTime)
        .attr('x', this.leftPosition)
        .attr('y', this.scale.y(this.yMax))
        .style('font-size', '50%');

      d3.select(this.$refs.benchmarkTime)
        .attr('x', this.leftPosition)
        .attr('y', this.scale.y(this.benchmarkMax))
        .style('font-size', '50%');
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
