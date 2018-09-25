<template>
  <g class='lines'>
    <path
      v-for="(well, index) in wellList"
      :key="`${index}-line-section`"
      :style="lineStyle"
      :d="drawLine(well)"
      :stroke="well.color"
      :opacity="!selectedWell.wellName || well.wellName === selectedWell.wellName ? 1 : 0.2"
    />
    <g
      v-for="(bit, index) in selectedWell.drillBits"
      v-if="
        currentBitFilter.id === 'all' ||
        (currentBitFilter.id === 'last' && index === selectedWell.drillBits.length - 1) ||
        index === currentBitFilter.id - 1"
      :key="index"
    >
      <circle
        :cx="getCoords(bit, selectedWell.benchmarkInputByPortionInfo).x"
        :cy="getCoords(bit, selectedWell.benchmarkInputByPortionInfo).y"
        :r="5"
      />
      <text
        :x="getCoords(bit, selectedWell.benchmarkInputByPortionInfo).x"
        :y="getCoords(bit, selectedWell.benchmarkInputByPortionInfo).y"
        :dy="index ? 0 : 10"
        :dx="15"
        :style="textStyle"
        :stroke="selectedWell.color"
        :fill="selectedWell.color"
      >
        {{bit.bitType}}
      </text>
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
        strokeWidth: 1.5,
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
    drawLine(well) {
      const path = d3.line()
        .x(d => this.scale.x(d.drilledHours))
        .y(d => this.scale.y(d.startDepth));
      const filterLine = [];
      if (this.currentBitFilter.id === 'all') {
        filterLine.push(...well.benchmarkInputByPortionInfo);
      } else if (this.currentBitFilter.id === 'last') {
        const filterDepth = well.drillBits[well.drillBits.length - 1].depthIn;
        filterLine.push(...well.benchmarkInputByPortionInfo
          .filter(depth => depth.startDepth >= filterDepth));
      } else if (this.currentBitFilter.id - 1 >= well.drillBits.length) {
        return path([]);
      } else {
        const drillBitIndex = this.currentBitFilter.id - 1;
        const drillBitLastIndex = this.currentBitFilter.id;
        const filterDepth = well.drillBits[drillBitIndex].depthIn;
        const filterDepthLast = well.drillBits.length === this.currentBitFilter.id ?
          Infinity : well.drillBits[drillBitLastIndex].depthIn;
        filterLine.push(...well.benchmarkInputByPortionInfo
          .filter(depth => depth.startDepth >= filterDepth && depth.startDepth <= filterDepthLast));
      }
      return path(filterLine);
    },
    findBisect(depthIn, lineData) {
      const bisector = d3.bisector(d => d.startDepth).left;
      const lineArray = [].concat(...lineData);
      const indexWell = bisector(lineArray, depthIn) === lineArray.length ?
        bisector(lineArray, depthIn) - 1 : bisector(lineArray, depthIn);
      return lineArray[indexWell].drilledHours;
    },
    getCoords(bit, lineData) {
      const x = this.findBisect(bit.depthIn, lineData);
      return {
        x: this.scale.x(x),
        y: this.scale.y(bit.depthIn),
      };
    },
  },
  computed: {
    currentBitFilter() {
      return this.$store.state.well.currentBitFilter;
    },
    drillBits() {
      return this.$store.state.well.currentBitFilter;
    },
    selectedWell() {
      return this.$store.state.well.selectedWell;
    },
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
