<template>
  <g class='lines'>
    <clipPath
      id="clip-area"
    >
      <rect
        :width="this.layout.width"
        :height="this.layout.height"
        fill="#F9F9F9"
      />
    </clipPath>
    <path
      v-for="(well, index) in wellList"
      :key="`${index}-area-section`"
      :style="lineStyle"
      :d="drawLine(well)"
      :fill="well.color"
      clip-path="url(#clip-area)"
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
        opacity: 0.6,
      },
    };
  },
  methods: {
    drawLine(well) {
      const filteredSlope = this.combinedSlopeData.filter(slope => slope.well === well.wellName);
      const path = d3.area()
        .defined(d => d.running_average_gradient_diff > this.xDomain.min)
        .y1(d => this.scale.y(d.cumulativeDepth))
        .x0(d => this.scale.x(d.running_average_gradient_diff))
        .x1(this.xDomain.min)
        .y0(d => this.scale.y(d.cumulativeDepth));
      return path(filteredSlope);
    },
  },
  computed: {
    combinedSlopeData() {
      return this.$store.getters.combinedSlopeData;
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
