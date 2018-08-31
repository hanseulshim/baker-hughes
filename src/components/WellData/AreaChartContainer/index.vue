<template>
  <div id="area-chart-container">
    <svg :view-box.camel="viewBox" preserveAspectRatio="xMidYMid meet">
      <g :style="stageStyle">
        <rect
          :width="this.layout.width"
          :height="this.layout.height"
          fill="#F9F9F9"
        />
        <area-chart-axis
          v-for="(axis, index) in axes"
          :key="index + axis"
          :axis="axis"
          :layout="layout"
          :scale="scale"
        />
        <area-chart-line
          :layout="layout"
          :scale="scale"
        />
        <area-chart-label
          :layout="layout"
          :scale="scale"
        />
      </g>
    </svg>
  </div>
</template>

<script>
import * as d3 from 'd3';
import AreaChartAxis from './AreaChartAxis';
import AreaChartLabel from './AreaChartLabel';
import AreaChartLine from './AreaChartLine';
// import LineChartTooltip from './LineChartTooltip';

export default {
  name: 'area-chart-container',
  components: {
    AreaChartAxis,
    AreaChartLabel,
    AreaChartLine,
    // LineChartTooltip,
  },
  data() {
    return {
      layout: {
        width: 300,
        height: 800,
        marginTop: 45,
        marginRight: 50,
        marginBottom: 50,
        marginLeft: 0,
      },
      axes: ['left', 'top'],
    };
  },
  computed: {
    scale() {
      return {
        x: this.getScaleX(),
        y: this.getScaleY(),
        color: d3.scaleOrdinal(d3.schemeCategory10),
      };
    },
    stageStyle() {
      return {
        transform: `translate(${this.layout.marginLeft}px, ${this.layout.marginTop}px)`,
      };
    },
    viewBox() {
      const outerWidth = this.layout.width + this.layout.marginLeft + this.layout.marginRight;
      const outerHeight = this.layout.height + this.layout.marginTop + this.layout.marginBottom;
      return `0 0 ${outerWidth} ${outerHeight}`;
    },
    xMax() {
      return this.$store.getters.maxSlope;
    },
    yMax() {
      return this.$store.getters.maxDepth;
    },
  },
  methods: {
    getScaleX() {
      return d3.scaleLinear()
        // .domain([0, this.xMax])
        .domain([0, 0.05])
        .range([0, this.layout.width])
        .nice();
    },
    getScaleY() {
      return d3.scaleLinear()
        .domain([0, this.yMax])
        .range([0, this.layout.height])
        .nice();
    },
  },
  watch: {
    layout: {
      deep: true,
      handler() {
        this.scale.x = this.getScaleX();
        this.scale.y = this.getScaleY();
      },
    },
  },
};
</script>

<style lang="sass" scoped>
#area-chart-container
  width: 300px
</style>

