<template>
  <g class='lines'>
    <g
      v-for="(line, index) in splitLines"
      :key="`${index}-line-section`"
    >
      <path
        :style="lineStyle"
        :d="drawLine(line)"
        :stroke="colors.line[index]"
      />
      <circle
        :cx="scale.x(splitLines[index].slice(-1)[0][xLabel])"
        :cy="scale.y(splitLines[index].slice(-1)[0].startDepth)"
        :r="3"
        :stroke="colors.line[index]"
        :fill="colors.line[index]"
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
        :r="3"
        :style="circleStyle"
      />
    </g>
  </g>
</template>

<script>
import { mapGetters } from 'vuex';
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
        this.colors.line[index] : this.colors.line[index + 1];
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
    ...mapGetters({
      drillBits: 'drillBits',
      lineData: 'wellData',
      splitLines: 'splitData',
    }),
    colors() {
      return this.$store.state.chartInfo.colors;
    },
    xLabel() {
      return this.$store.state.options.currentCompare;
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
