<template>
  <g>
    <g :style="style" :opacity="opacity">
      <circle :cx="wellCoords.x" :cy="wellCoords.y" :r="5"/>
    </g>
    <g :style="style" :opacity="opacity">
      <circle :cx="benchmarkCoords.x" :cy="benchmarkCoords.y" :r="5"/>
    </g>
    <path :style="lineStyle" :opacity="opacity" :d="d" />
    <g
      :opacity="opacity"
    >
      <rect
        fill="#5B5959"
        :height="bbox.height + 5"
        :width="bbox.width + 10"
        :x="layout.width - (bbox.width + 10)"
        :y="wellCoords.y - 10"
      />
      <text
        class="hour-label"
        ref="text"
        :x="layout.width - bbox.width - 5"
        :y="wellCoords.y"
      >
        <tspan v-if="currentCompare">Benchmark: {{Math.round(dataBenchmark.value)}} hrs</tspan>
        <tspan v-else>Benchmark: ${{Math.round(dataBenchmark.value / 1000)}}k</tspan>
        <tspan v-if="currentCompare">Time: {{Math.round(dataWell.drilledHours)}} hrs</tspan>
        <tspan v-else>Cost: ${{Math.round(dataWell.drilledHours / 1000)}}k</tspan>
      </text>
    </g>
    <rect
      ref="rect"
      @mouseover="showVisible"
      @mouseout="hideVisible"
      :width="layout.width"
      :height="layout.height"
      fill="none"
      pointer-events="all"
    />
  </g>
</template>

<script>
import * as d3 from 'd3';

export default {
  name: 'line-chart-tooltip',
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
      bbox: { width: 0, height: 0 },
      dataWell: { drilledHours: 0, startDepth: 0 },
      dataBenchmark: { value: 0, startDepth: 0 },
      lineStyle: {
        stroke: '#828488',
        strokeDasharray: '7, 3',
      },
      opacity: 0,
      style: {
        fill: 'none',
        stroke: '#828488',
        strokeWidth: 3,
      },
    };
  },
  computed: {
    benchmarks() {
      return this.$store.getters.benchmarks;
    },
    benchmarkCoords() {
      return {
        x: this.scale.x(this.dataBenchmark.value),
        y: this.scale.y(this.dataBenchmark.startDepth),
      };
    },
    currentCompare() {
      return this.$store.state.currentCompare === 'time';
    },
    d() {
      return `M${0},${this.wellCoords.y} ${this.layout.width},${this.wellCoords.y}`;
    },
    lineData() {
      return this.$store.getters.wellData;
    },
    wellCoords() {
      return {
        x: this.scale.x(this.dataWell.drilledHours),
        y: this.scale.y(this.dataWell.startDepth),
      };
    },
  },
  mounted() {
    this.createTooltips();
  },
  methods: {
    createTooltips() {
      d3.select(this.$refs.rect)
        .on('mousemove', this.mousemove);
    },
    hideVisible() {
      this.opacity = 0;
    },
    mousemove() {
      const yValue = this.scale.y.invert(d3.mouse(this.$refs.rect)[1]);
      const bisector = d3.bisector(d => d.startDepth).left;
      const indexWell = bisector(this.lineData, yValue) === this.lineData.length ?
        bisector(this.lineData, yValue) - 1 : bisector(this.lineData, yValue);
      const indexBenchmark = bisector(this.benchmarks, yValue) === this.benchmarks.length ?
        bisector(this.benchmarks, yValue) - 1 : bisector(this.benchmarks, yValue);
      this.dataWell = this.lineData[indexWell];
      this.dataBenchmark = this.benchmarks[indexBenchmark];
      this.bbox = this.$refs.text.getBBox();
    },
    showVisible() {
      this.opacity = 1;
    },
  },
};
</script>

<style lang="sass" scoped>
.hour-label
  font-size: .5em
  fill: #FFF
</style>
