<template>
  <div id="line-chart-container" ref="container">
    <svg :view-box.camel="viewBox" preserveAspectRatio="xMidYMid meet">
      <g :style="stageStyle">
        <line-chart-formation
          :layout="layout"
          :scale="scale"
        />
        <line-chart-label
          :layout="layout"
          :scale="scale"
        />
        <line-chart-axis
          v-for="(axis, index) in axes"
          :key="index + axis"
          :axis="axis"
          :layout="layout"
          :scale="scale"
        />
        <benchmark-line
          :scale="scale"
        />
        <line-chart-line
          :layout="layout"
          :scale="scale"
        />
        <line-chart-tooltip
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
import BenchmarkLine from './BenchmarkLine';
import Info from './Info';
import LineChartAxis from './LineChartAxis';
import LineChartFormation from './LineChartFormation';
import LineChartLabel from './LineChartLabel';
import LineChartLine from './LineChartLine';
import LineChartTooltip from './LineChartTooltip';

export default {
  name: 'line-chart-container',
  components: {
    BenchmarkLine,
    Info,
    LineChartAxis,
    LineChartFormation,
    LineChartLabel,
    LineChartLine,
    LineChartTooltip,
  },
  data() {
    return {
      layout: {
        width: 650,
        height: this.$store.state.chartInfo.layout.height,
        marginTop: this.$store.state.chartInfo.layout.marginTop,
        marginRight: 20,
        marginBottom: this.$store.state.chartInfo.layout.marginBottom,
        marginLeft: 75,
      },
      axes: ['left', 'top'],
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
      return this.$store.getters.xMax;
    },
    yMax() {
      return this.$store.getters.maxDepth;
    },
  },
  methods: {
    getScaleX() {
      return d3.scaleLinear()
        .domain([0, this.xMax * 1.25])
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
#line-chart-container
  position: relative
</style>
