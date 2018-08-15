<template>
  <g>
    <text ref='xLabel'>Depth (ft.)</text>
    <text ref='yLabel'>Time (hrs.)</text>
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
  },
  mounted() {
    this.drawLabels();
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
    },
  },
};
</script>
