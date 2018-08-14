<template>
  <circle class="point" ref="point" :style="style"></circle>
</template>

<script>
import * as d3 from 'd3';

export default {
  template: 'chart-point',
  props: ['layout', 'point-data', 'scale', 'color', 'xPropName', 'yPropName'],
  mounted() {
    this.drawPoint();
  },
  methods: {
    drawPoint() {
      d3.select(this.$refs.point)
        .datum(this.pointData)
        .attr('cx', d => this.scale.x(d[this.xPropName]))
        .attr('cy', d => this.scale.y(d[this.yPropName]))
        .attr('r', 5);
    },
  },
  computed: {
    style() {
      return {
        fill: '#000',
        stroke: '#000',
        strokeWidth: 2,
      };
    },
  },
  watch: {
    scale: {
      deep: true,
      handler() {
        this.drawPoint();
      },
    },
  },
};
</script>

<style>

</style>
