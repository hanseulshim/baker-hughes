<template>
  <clip-path id='clip-path' class="clip-path" :style="style">
    <rect ref='clip-rect'></rect>
  </clip-path>
</template>

<script>
import * as d3 from 'd3';

export default {
  name: 'chart-clip-path',
  props: ['layout', 'series-data', 'scale', 'color', 'xPropName', 'yPropName'],
  mounted() {
    this.drawRect();
  },
  methods: {
    drawRect() {
      d3.select(this.$refs.clipRect)
        .attr('x', 175)
        .attr('y', 100)
        .attr('height', 100)
        .attr('width', 50);
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
