<template>
  <g>
    <g :style="style" :opacity="opacity">
      <circle :cx="xWell" :cy="yWell" :r="5"/>
    </g>
    <g :style="style" :opacity="opacity">
      <circle :cx="xBenchmark" :cy="yBenchmark" :r="5"/>
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
        :y="yWell - 10"
      />
      <text
        class="hour-label"
        ref="text"
        :x="layout.width - bbox.width - 5"
        :y="yWell"
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
      d: '',
      dataWell: {},
      dataBenchmark: {},
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
      xBenchmark: 0,
      xWell: 0,
      yBenchmark: 0,
      yWell: 0,
    };
  },
  computed: {
    benchmarks() {
      return this.$store.getters.benchmarks;
    },
    currentCompare() {
      return this.$store.state.currentCompare === 'time';
    },
    lineData() {
      return this.$store.getters.wellData;
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
      this.xWell = this.scale.x(this.dataWell.drilledHours);
      this.yWell = this.scale.y(this.dataWell.startDepth);
      this.xBenchmark = this.scale.x(this.dataBenchmark.value);
      this.yBenchmark = this.scale.y(this.dataBenchmark.startDepth);
      this.d = `M${0},${this.yWell} ${this.layout.width},${this.yWell}`;
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
