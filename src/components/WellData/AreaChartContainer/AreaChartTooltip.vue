<template>
  <g>
    <path :style="lineStyle" :opacity="lineOpacity" :d="d" />
    <g
      :opacity="lineOpacity"
    >
      <rect
        fill="#5B5959"
        :height="bboxSlope.height + 5"
        :width="bboxSlope.width + 10"
        :x="((layout.width - bboxSlope.width) / 2) - 5"
        :y="wellCoords.y - 13"
      />
      <text
        class="hour-label"
        id="hour-label-slope"
        :x="(layout.width - bboxSlope.width) / 2"
        :y="wellCoords.y"
      >
        Slope Diff: {{Math.round(dataSlope.running_average_gradient_diff * 1000) / 1000}}
      </text>
      <rect
        fill="#FFF"
        :height="20"
        :width="60"
        :x="layout.width"
        :y="wellCoords.y - 15"
      />
      <text
        class="depth-label"
        id="depth-label-slope"
        :x="layout.width + 5"
        :y="wellCoords.y"
      >
        {{Math.round(depth)}} ft
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
import { mapGetters, mapState } from 'vuex';

export default {
  name: 'area-chart-tooltip',
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
    ...mapState('hover', ['dataBenchmark', 'dataSlope', 'dataWell', 'bboxSlope', 'lineOpacity']),
    ...mapGetters({
      benchmarks: 'benchmarks',
      lineData: 'wellData',
      slopeData: 'slopeData',
    }),
    d() {
      return `M${0},${this.wellCoords.y} ${this.layout.width},${this.wellCoords.y}`;
    },
    depth() {
      return this.dataSlope.cumulativeDepth < this.lineData[0].startDepth ?
        this.dataSlope.cumulativeDepth : this.dataWell.startDepth;
    },
    wellCoords() {
      return {
        x: this.scale.x(this.dataSlope.running_average_gradient_diff),
        y: this.scale.y(this.depth),
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
      this.$store.dispatch('hover/updateDataWell', this.lineData[indexWell]);
      this.$store.dispatch('hover/updateDataBenchmark', this.benchmarks[indexBenchmark]);
      this.$store.dispatch('hover/updateDataSlope', this.slopeData[indexSlope]);
      this.$store.dispatch('hover/updateBboxSlope', d3.select('#hour-label-slope').node().getBBox());
      this.$store.dispatch('hover/updateBbox', d3.select('#hour-label-text').node().getBBox());
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
.depth-label
  font-size: 80%
  fill: #828488
</style>
