<template>
  <g class='lines'>
    <path
      v-for="(well, index) in wellList"
      :key="`${index}-line-section`"
      :style="lineStyle"
      :d="drawLine(well.benchmarkInputByPortionInfo)"
      :stroke="well.color"
    />
  </g>
</template>

<script>
import * as d3 from 'd3';

export default {
  name: 'line-chart-line',
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
        fill: 'none',
        strokeWidth: 3,
      },
      textStyle: {
        fontSize: '.65em',
        strokeWidth: 0.3,
      },
      circleStyle: {
        fill: '#000',
        stroke: '#000',
      },
    };
  },
  methods: {
    drawLine(line) {
      const path = d3.line()
        .x(d => this.scale.x(d.drilledHours))
        .y(d => this.scale.y(d.startDepth));
      return path(line);
    },
  },
  computed: {
    wellList() {
      return this.$store.getters.combinedWells.wellList;
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
