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
        :stroke="scale.color(index)"
        :fill="scale.color(index)"
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
        strokeWidth: 2,
      },
    };
  },
  methods: {
    getCoords(bit) {
      const x = this.findBisect(bit.depthIn);
      return {
        x: this.scale.x(x),
        y: this.scale.y(bit.depthIn),
      };
    },
    findBisect(depthIn) {
      const bisector = d3.bisector(d => d.startDepth).left;
      const indexWell = bisector(this.lineData, depthIn) === this.lineData.length ?
        bisector(this.lineData, depthIn) - 1 : bisector(this.lineData, depthIn);
      return this.lineData[indexWell].drilledHours;
    },
    drawLine(line) {
      const path = d3.line()
        .x(d => this.scale.x(d.drilledHours))
        .y(d => this.scale.y(d.startDepth));
      return path(line);
    },
  },
  computed: {
    drillBits() {
      return this.$store.state.currentWell.drillBits.slice().sort((a, b) => a.depthIn - b.depthIn);
    },
    lineData() {
      return this.$store.state.currentWell.benchmarkInputByPortionInfo;
    },
    splitLines() {
      const lineData = this.lineData.slice();
      const splitLines = [];
      this.drillBits.forEach((bit) => {
        const index = lineData.findIndex(line => line.startDepth > bit.depthIn);
        const slicedArray = lineData.splice(0, index);
        if (slicedArray.length) { splitLines.push(slicedArray); }
      });
      if (lineData.length) { splitLines.push(lineData); }
      return splitLines;
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
