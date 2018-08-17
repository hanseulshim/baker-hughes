<template>
  <g>
    <text ref='xLabel'>Depth (ft.)</text>
    <text ref='yLabel'>Time (hrs.)</text>
    <text ref='wellTime'>
      <tspan>- Complete Time</tspan>
      <tspan :x="leftPosition + 5" dy="1em">{{Math.round(yMax)}} hrs</tspan>
    </text>
    <text ref='benchmarkTime'>
      <tspan>- Benchmark Time</tspan>
      <tspan :x="leftPosition + 5" dy="1em">{{Math.round(benchmarkMax)}} hrs</tspan>
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
      d3.select(this.$refs.xLabel)
        .attr('x', this.layout.width / 2)
        .attr('y', this.layout.height + this.layout.marginTop)
        .style('text-anchor', 'middle');

      d3.select(this.$refs.yLabel)
        .attr('y', 0 - this.layout.marginRight)
        .attr('x', 0 - (this.layout.height / 2))
        .attr('transform', 'rotate(-90)')
        .style('text-anchor', 'middle');

      d3.select(this.$refs.wellTime)
        .attr('x', this.leftPosition)
        .attr('y', this.scale.y(this.yMax))
        .style('font-size', '.5em');

      d3.select(this.$refs.benchmarkTime)
        .attr('x', this.leftPosition)
        .attr('y', this.scale.y(this.benchmarkMax))
        .style('font-size', '.5em');
    },
  },
};
</script>
