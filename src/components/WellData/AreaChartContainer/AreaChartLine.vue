<template>
  <g class='lines'>
    <g
      v-for="(line, index) in splitLines"
      :key="`${index}-area-section`"
    >
      <path
        :style="lineStyle"
        :d="drawLine(line)"
        :stroke="scale.color(index)"
        :fill="scale.color(index)"
      />
    </g>
  </g>
</template>

<script>
import * as d3 from 'd3';

export default {
  name: 'area-chart-line',
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
  data() {
    return {
      lineStyle: {
        strokeWidth: 3,
      },
    };
  },
  methods: {
    drawLine(line) {
      const path = d3.area()
        .y1(d => this.scale.y(d.cumulativeDepth))
        .x0(d => this.scale.x(d.running_average_gradient_diff))
        .x1(0)
        .y0(d => this.scale.y(d.cumulativeDepth));
      return path(line);
    },
  },
  computed: {
    splitLines() {
      return this.$store.getters.splitSlopeData;
    },
  },
  watch: {
    scale: {
      deep: true,
      handler() {
      },
    },
  },
};
</script>
