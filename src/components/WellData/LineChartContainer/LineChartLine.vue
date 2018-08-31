<template>
  <g class='lines'>
    <g
      v-for="(line, index) in splitLines"
      :key="`${index}-line-section`"
    >
      <path
        :style="lineStyle"
        :d="drawLine(line)"
        :stroke="scale.color(index)"
      />
    </g>
    <g
      v-for="(bit, index) in drillBits"
      :key="`${index}-${bit.bitType}`"
    >
      <text
        :x="getCoords(bit).x"
        :y="getCoords(bit).y"
        :dy="index ? 0 : 10"
        :dx="15"
        :style="textStyle"
        :stroke="bitColor(index)"
        :fill="bitColor(index)"
      >
        {{bit.bitType}}
      </text>
      <circle
        :cx="getCoords(bit).x"
        :cy="getCoords(bit).y"
        :r="5"
        :style="circleStyle"
      />
    </g>
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
    bitColor(index) {
      return this.splitLines.length === this.drillBits.length ?
        this.scale.color(index) : this.scale.color(index + 1);
    },
    drawLine(line) {
      const path = d3.line()
        .x(d => this.scale.x(d[this.xLabel]))
        .y(d => this.scale.y(d.startDepth));
      return path(line);
    },
    findBisect(depthIn) {
      const bisector = d3.bisector(d => d.startDepth).left;
      const lineArray = [].concat(...this.lineData);
      const indexWell = bisector(lineArray, depthIn) === lineArray.length ?
        bisector(lineArray, depthIn) - 1 : bisector(lineArray, depthIn);
      return lineArray[indexWell][this.xLabel];
    },
    getCoords(bit) {
      const x = this.findBisect(bit.depthIn);
      return {
        x: this.scale.x(x),
        y: this.scale.y(bit.depthIn),
      };
    },
  },
  computed: {
    drillBits() {
      return this.$store.state.currentWell.drillBits.slice().sort((a, b) => a.depthIn - b.depthIn);
    },
    lineData() {
      return this.$store.getters.wellData;
    },
    splitLines() {
      return this.$store.getters.splitData;
    },
    xLabel() {
      return this.$store.state.currentCompare;
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
