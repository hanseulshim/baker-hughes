<template>
  <g class='line'>
    <g
      v-for="(line, index) in splitLines"
      :key="`${index}-line-section`"
    >
      <text
        :x="getCoordinate(line).x"
        :y="getCoordinate(line).y"
        :dy="index ? 0 : 10"
        :dx="15"
        :style="textStyle"
        :stroke="scale.color(index)"
        :fill="scale.color(index)"
      >
        {{drillBits[index].bitType}}
      </text>
      <path
        :style="lineStyle"
        :d="drawLine(line)"
        :stroke="scale.color(index)"
      />
      <circle
        v-if="index"
        :cx="scale.x(line[0].drilledHours)"
        :cy="scale.y(drillBits[index].depthIn)"
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
    getCoordinate(line) {
      return {
        x: this.scale.x(line[0].drilledHours),
        y: this.scale.y(line[0].startDepth),
      };
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
      return this.$store.state.currentWell.drillBits;
    },
    lineData() {
      return this.$store.state.currentWell.benchmarkInputByPortionInfo;
    },
    splitLines() {
      const lineData = this.lineData.slice();
      const splitLines = [];
      this.drillBits.forEach((bit) => {
        const index = lineData.findIndex(line => line.startDepth > bit.depthIn);
        if (index) {
          splitLines.push(lineData.splice(0, index));
        }
      });
      if (lineData.length > 0) {
        splitLines.push(lineData);
      }
      return splitLines;
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
