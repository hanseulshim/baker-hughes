<template>
  <g class="benchmark">
    <path
      :d="line"
      :style="style"
    />
  </g>
</template>

<script>
import * as d3 from 'd3';

export default {
  name: 'benchmark-line',
  props: {
    scale: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      line: '',
    };
  },
  mounted() {
    this.drawLine();
  },
  methods: {
    drawLine() {
      const path = d3.line()
        .x(d => this.scale.x(d.value))
        .y(d => this.scale.y(d.startDepth));
      this.line = path(this.benchmarkLine);
    },
  },
  computed: {
    benchmarkLine() {
      return this.$store.getters.benchmarks;
    },
    style() {
      return {
        fill: 'none',
        stroke: '#858585',
        strokeWidth: 2,
        strokeDasharray: '7, 3',
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
