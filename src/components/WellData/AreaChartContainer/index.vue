<template>
  <div id="area-chart-container" ref="container">
    <svg :view-box.camel="viewBox" preserveAspectRatio="xMidYMid meet">
      <g :style="stageStyle">
        <area-chart-line
          :layout="layout"
          :scale="scale"
          :xDomain="xDomain"
        />
        <area-chart-label
          :layout="layout"
          :scale="scale"
        />
        <area-chart-axis
          v-for="(axis, index) in axes"
          :key="index + axis"
          :axis="axis"
          :layout="layout"
          :scale="scale"
        />
        <area-chart-tooltip
          :layout="layout"
          :scale="scale"
        />
      </g>
    </svg>
    <info />
  </div>
</template>

<script>
import * as d3 from 'd3';
import AreaChartAxis from './AreaChartAxis';
import AreaChartLabel from './AreaChartLabel';
import AreaChartLine from './AreaChartLine';
import AreaChartTooltip from './AreaChartTooltip';
import Info from './Info';

export default {
  name: 'area-chart-container',
  components: {
    AreaChartAxis,
    AreaChartLabel,
    AreaChartLine,
    AreaChartTooltip,
    Info,
  },
  data() {
    return {
      axes: ['left', 'top'],
      layout: {
        width: 150,
        height: this.$store.state.chartInfo.layout.height,
        marginTop: this.$store.state.chartInfo.layout.marginTop,
        marginRight: 50,
        marginBottom: this.$store.state.chartInfo.layout.marginBottom,
        marginLeft: 20,
      },
      xDomain: {
        min: -0.01,
        max: 0.025,
      },
    };
  },
  mounted() {
    this.$refs.container.style.width = this.width;
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
    width() {
      return `${this.layout.width + this.layout.marginLeft + this.layout.marginRight}px`;
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
        .domain([this.xDomain.min, this.xDomain.max])
        .range([0, this.layout.width]);
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
  position: relative
</style>
