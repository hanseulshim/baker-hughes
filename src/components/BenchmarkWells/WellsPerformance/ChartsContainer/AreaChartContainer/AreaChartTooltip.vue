<template>
  <g>
    <path :style="lineStyle" :opacity="lineOpacity" :d="d" />
    <g
      :opacity="showWellInfo()"
    >
      <rect
        fill="#5B5959"
        :height="bboxSlope.height + 5"
        :width="bboxSlope.width + 10"
        :x="0"
        :y="wellCoords.y - 13"
      />
      <text
        class="hour-label"
        id="hour-label-slope"
        :x="5"
        :y="wellCoords.y"
      >
        Slope Diff: {{slopeDiff}}
      </text>
    </g>
    <g :opacity="lineOpacity">
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
        {{getDepth(depth)}} ft
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
import { mapState } from 'vuex';

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
    ...mapState('hover', ['dataSlope', 'dataWell', 'bboxSlope', 'lineOpacity']),
    bitFilterLines() {
      return this.$store.getters.bitFilterLines;
    },
    d() {
      return `M${0},${this.wellCoords.y} ${this.layout.width},${this.wellCoords.y}`;
    },
    lineData() {
      return this.$store.state.well.selectedWell.wellName ?
        this.$store.state.well.selectedWell.benchmarkInputByPortionInfo :
        this.$store.getters.wellData;
    },
    depth() {
      return this.dataSlope.cumulativeDepth < this.lineData[0].startDepth ?
        this.dataSlope.cumulativeDepth : this.dataWell.startDepth;
    },
    selectedWell() {
      return this.$store.state.well.selectedWell;
    },
    slopeData() {
      return this.$store.getters.combinedSlopeData
        .filter(slope => (
          this.$store.state.well.selectedWell.wellName ?
            this.$store.state.well.selectedWell.wellName === slope.well :
            this.$store.state.well.currentWell.wellName === slope.well));
    },
    slopeDiff() {
      return numeral(this.dataSlope.running_average_gradient_diff).format('0.000');
    },
    wellCoords() {
      return {
        x: this.scale.x(this.dataSlope.running_average_gradient_diff),
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
    getDepth(depth) {
      return numeral(depth).format('0,0');
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
      const indexSlope = bisectorSlope(this.slopeData, yValue) === this.slopeData.length ?
        bisectorSlope(this.slopeData, yValue) - 1 : bisectorSlope(this.slopeData, yValue);
      const payload = {
        dataWell: this.lineData[indexWell],
        dataSlope: this.slopeData[indexSlope],
        bboxSlope: d3.select('#hour-label-slope').node().getBBox(),
        bbox: d3.select('#hour-label-text').node().getBBox(),
      };
      this.$store.dispatch('hover/updateHover', payload);
    },
    showWellInfo() {
      const well = this.bitFilterLines
        .find(bitFilterWell => bitFilterWell.wellName === this.selectedWell.wellName);
      const maxDepth = well ? well.maxDepth : -Infinity;
      const minDepth = well ? well.minDepth : Infinity;
      return (
        this.selectedWell.wellName &&
        well.wellName === this.dataSlope.well &&
        this.dataWell.startDepth <= maxDepth &&
        this.dataWell.startDepth >= minDepth ? this.lineOpacity : 0);
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
