<template>
  <g>
    <g :style="style" :opacity="lineOpacity">
      <circle :cx="wellCoords.x" :cy="wellCoords.y" :r="5"/>
    </g>
    <g :style="style" :opacity="lineOpacity">
      <circle :cx="benchmarkCoords.x" :cy="benchmarkCoords.y" :r="5"/>
    </g>
    <path :style="lineStyle" :opacity="lineOpacity" :d="d" />
    <g
      :opacity="lineOpacity"
    >
      <rect
        fill="#5B5959"
        :height="bbox.height + 5"
        :width="bbox.width + 10"
        :x="layout.width - (bbox.width + 10)"
        :y="wellCoords.y - 13"
      />
      <text
        class="hour-label"
        id="hour-label-text"
        :x="layout.width - bbox.width - 5"
        :y="wellCoords.y"
      >
        <tspan v-if="currentCompare">Benchmark: {{Math.round(dataBenchmark.value)}} hrs</tspan>
        <tspan v-else>Benchmark: ${{benchmarkValue}}</tspan>
        <tspan v-if="currentCompare">Time: {{Math.round(dataWell[xLabel])}} hrs</tspan>
        <tspan v-else>Cost: ${{costValue}}</tspan>
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
import numeral from 'numeral';
import { mapGetters, mapState } from 'vuex';

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
      lineStyle: {
        stroke: '#828488',
        strokeDasharray: '7, 3',
      },
      style: {
        fill: 'none',
        stroke: '#828488',
        strokeWidth: 3,
      },
    };
  },
  computed: {
    ...mapState('hover', ['dataBenchmark', 'dataSlope', 'dataWell', 'bbox', 'lineOpacity']),
    ...mapGetters({
      benchmarks: 'benchmarks',
      lineData: 'wellData',
      slopeData: 'slopeData',
    }),
    benchmarkCoords() {
      return {
        x: this.scale.x(this.dataBenchmark.value),
        y: this.scale.y(this.dataBenchmark.startDepth),
      };
    },
    benchmarkValue() {
      return numeral(this.dataBenchmark.value).format('0a');
    },
    costValue() {
      return numeral(this.dataWell[this.xLabel]).format('0a');
    },
    currentCompare() {
      return this.$store.state.options.currentCompare === 'time';
    },
    d() {
      return `M${0},${this.wellCoords.y} ${this.layout.width},${this.wellCoords.y}`;
    },
    wellCoords() {
      return {
        x: this.scale.x(this.dataWell[this.xLabel]),
        y: this.scale.y(this.dataWell.startDepth),
      };
    },
    xLabel() {
      return this.$store.state.options.currentCompare;
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
      this.$store.dispatch('hover/hideVisible');
    },
    mousemove() {
      const yValue = this.scale.y.invert(d3.mouse(this.$refs.rect)[1]);
      const bisector = d3.bisector(d => d.startDepth).left;
      const bisectorSlope = d3.bisector(d => d.cumulativeDepth).left;
      const indexWell = bisector(this.lineData, yValue) === this.lineData.length ?
        bisector(this.lineData, yValue) - 1 : bisector(this.lineData, yValue);
      const indexBenchmark = bisector(this.benchmarks, yValue) === this.benchmarks.length ?
        bisector(this.benchmarks, yValue) - 1 : bisector(this.benchmarks, yValue);
      const indexSlope = bisectorSlope(this.slopeData, yValue) === this.slopeData.length ?
        bisectorSlope(this.slopeData, yValue) - 1 : bisectorSlope(this.slopeData, yValue);
      const payload = {
        dataWell: this.lineData[indexWell],
        dataBenchmark: this.benchmarks[indexBenchmark],
        dataSlope: this.slopeData[indexSlope],
        bboxSlope: d3.select('#hour-label-slope').node().getBBox(),
        bbox: d3.select('#hour-label-text').node().getBBox(),
      };
      this.$store.dispatch('hover/updateHover', payload);
    },
    showVisible() {
      this.$store.dispatch('hover/showVisible');
    },
  },
};
</script>

<style lang="sass" scoped>
.hour-label
  font-size: 75%
  fill: #FFF
</style>
