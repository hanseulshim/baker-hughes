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
      v-for="(well, index) in bitFilterLines"
      :key="`${index}-area-section`"
      :style="lineStyle"
      :d="drawLine(well.filterSlope)"
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
    drawLine(filterSlope) {
      const path = d3.area()
        .defined(d => d.running_average_gradient_diff > this.xDomain.min)
        .y1(d => this.scale.y(d.cumulativeDepth))
        .x0(d => this.scale.x(d.running_average_gradient_diff))
        .x1(this.xDomain.min)
        .y0(d => this.scale.y(d.cumulativeDepth));
      return path(filterSlope);
    },
  },
  computed: {
    bitFilterLines() {
      const wellList = this.$store.getters.bitFilterLines
        .filter(well => well.wellName !== this.selectedWell.wellName);
      const filteredWell = this.$store.getters.bitFilterLines
        .find(well => well.wellName === this.selectedWell.wellName);
      if (filteredWell) {
        wellList.push(filteredWell);
      }
      return wellList;
    },
    combinedSlopeData() {
      return this.$store.getters.combinedSlopeData;
    },
    currentBitFilter() {
      return this.$store.state.well.currentBitFilter;
    },
    selectedWell() {
      return this.$store.state.well.selectedWell;
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
