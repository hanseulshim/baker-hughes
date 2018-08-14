<template>
  <path class="line" ref="line" :style="style"></path>
</template>

<script>
import * as d3 from 'd3';

export default {
  name: 'chart-line',
  props: ['layout', 'series-data', 'scale', 'color', 'xPropName', 'yPropName'],
  mounted() {
    this.drawLine();
  },
  methods: {
    drawLine() {
      const line = d3.line()
        .defined(d => d[this.xPropName] < this.max)
        .x(d => this.scale.x(d[this.xPropName]))
        .y(d => this.scale.y(d[this.yPropName]));
      d3.select(this.$refs.line)
        .data([this.seriesData.data.filter(d =>
          typeof d[this.yPropName] !== typeof null)])
        .attr('d', line);
    },
  },
  computed: {
    style() {
      return {
        fill: 'none',
        stroke: this.color,
        strokeWidth: 2,
      };
    },
    max() {
      return d3.max(this.$store.state.singleWell.data.map(well => well[this.xPropName]));
    },
  },
  watch: {
    scale: {
      deep: true,
      handler() {
        this.drawLine();
      },
    },
  },
};
</script>
