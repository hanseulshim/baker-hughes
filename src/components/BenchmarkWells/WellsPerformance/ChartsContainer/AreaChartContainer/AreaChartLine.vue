<template>
  <g class='lines'>
    <clipPath
      id="clip-area"
    >
      <rect
        :width="this.layout.width"
        :height="this.layout.height"
      />
    </clipPath>
    <path
      v-for="(well, index) in wellList"
      :key="`${index}-area-section`"
      :style="lineStyle"
      :d="drawLine(well)"
      :fill="well.color"
      clip-path="url(#clip-area)"
      :opacity="well.wellName === selectedWell.wellName ? 1 : !selectedWell.wellName ? 0.6 : 0.2"
    />
  </g>
</template>

<script>
import * as d3 from 'd3';

export default {
  name: 'area-chart-line',
  props: {
    layout: {
      type: Object,
      required: true,
    },
    scale: {
      type: Object,
      required: true,
    },
    xDomain: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      lineStyle: {
        strokeWidth: 1.5,
      },
    };
  },
  methods: {
    drawLine(well) {
      const filteredSlope = this.combinedSlopeData.filter(slope => slope.well === well.wellName);
      const filterLine = [];
      const path = d3.area()
        .defined(d => d.running_average_gradient_diff > this.xDomain.min)
        .y1(d => this.scale.y(d.cumulativeDepth))
        .x0(d => this.scale.x(d.running_average_gradient_diff))
        .x1(this.xDomain.min)
        .y0(d => this.scale.y(d.cumulativeDepth));
      if (this.currentBitFilter.id === 'all') {
        filterLine.push(...filteredSlope);
      } else if (this.currentBitFilter.id === 'last') {
        const filterDepth = well.drillBits[well.drillBits.length - 1].depthIn;
        filterLine.push(...filteredSlope
          .filter(depth => depth.cumulativeDepth >= filterDepth));
      } else if (this.currentBitFilter.id - 1 >= well.drillBits.length) {
        return path([]);
      } else {
        const drillBitIndex = this.currentBitFilter.id - 1;
        const drillBitLastIndex = this.currentBitFilter.id;
        const filterDepth = well.drillBits[drillBitIndex].depthIn;
        const filterDepthLast = well.drillBits.length === this.currentBitFilter.id ?
          Infinity : well.drillBits[drillBitLastIndex].depthIn;
        filterLine.push(...filteredSlope
          .filter(depth =>
            depth.cumulativeDepth >= filterDepth && depth.cumulativeDepth <= filterDepthLast));
      }
      return path(filterLine);
    },
  },
  computed: {
    combinedSlopeData() {
      return this.$store.getters.combinedSlopeData;
    },
    currentBitFilter() {
      return this.$store.state.well.currentBitFilter;
    },
    selectedWell() {
      return this.$store.state.well.selectedWell;
    },
    wellList() {
      const wellList = this.$store.getters.combinedWells.wellList
        .filter(well => well.wellName !== this.selectedWell.wellName);
      if (this.selectedWell.wellName) {
        wellList.push(this.selectedWell);
      }
      return wellList;
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
