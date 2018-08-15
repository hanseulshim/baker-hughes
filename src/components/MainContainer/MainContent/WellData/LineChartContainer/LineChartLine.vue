<template>
  <path ref="line" :style="style"></path>
</template>

<script>
import * as d3 from 'd3';

export default {
  name: 'line-chart-line',
  props: {
    color: {
      type: String,
      required: true,
    },
    layout: {
      type: Object,
      required: true,
    },
    lineData: {
      type: Array,
      required: true,
    },
    scale: {
      type: Object,
      required: true,
    },
    xPropName: {
      type: String,
      required: true,
    },
    xMax: {
      type: Number,
      required: true,
    },
    yPropName: {
      type: String,
      required: true,
    },
  },
  mounted() {
    this.drawLine();
  },
  methods: {
    drawLine() {
      const line = d3.line()
        .defined(d => d[this.xPropName] < this.xMax)
        .x(d => this.scale.x(d[this.xPropName]))
        .y(d => this.scale.y(d[this.yPropName]));

      d3.select(this.$refs.line)
        .data([this.lineData.filter(d =>
          typeof d[this.yPropName] !== typeof null)])
        .attr('d', line);
    },
  },
  computed: {
    style() {
      return {
        fill: 'none',
        stroke: this.color,
        strokeWidth: 3,
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
