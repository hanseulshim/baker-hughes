<template>
  <g class='lines'>
    <rect
      :width="this.layout.width"
      :height="this.layout.height"
      fill="#F9F9F9"
    />
    <g
      v-for="(line, index) in splitLines"
      :key="`${index}-area-section`"
    >
      <path
        :style="lineStyle"
        :d="drawLine(line)"
        :stroke="colors.line[index]"
        :fill="colors.area[index]"
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
    xDomain: {
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
        .defined(d => d.running_average_gradient_diff > this.xDomain.min)
        .y1(d => this.scale.y(d.cumulativeDepth))
        .x0(d => this.scale.x(d.running_average_gradient_diff))
        .x1(this.xDomain.min)
        .y0(d => this.scale.y(d.cumulativeDepth));
      return path(line);
    },
  },
  computed: {
    colors() {
      return this.$store.state.colors;
    },
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
