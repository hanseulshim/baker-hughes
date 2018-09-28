<template>
  <g>
    <g
      :style="style"
      :opacity="showWellInfo()">
      <circle :cx="wellCoords.x" :cy="wellCoords.y" :r="5"/>
    </g>
    <path :style="lineStyle" :opacity="lineOpacity" :d="d" />
    <g
      :opacity="showWellInfo()"
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
        <tspan>Time: {{Math.round(dataWell.drilledHours)}} hrs</tspan>
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
import { mapState } from 'vuex';

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
    ...mapState('hover', ['dataSlope', 'dataWell', 'bbox', 'lineOpacity']),
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
</style>
