<template>
  <div id="line-chart-container">
    <svg :view-box.camel="viewBox" preserveAspectRatio="xMidYMid meet">
      <g :style="stageStyle">
        <line-chart-formation
          :layout="layout"
          :scale="scale"
        />
        <line-chart-label
          :layout="layout"
          :scale="scale"
          :x-max="xMax"
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
        <!--
        <line-chart-tooltip
          :benchmark-data="benchmarkData"
          :layout="layout"
          :scale="scale"
          :single-well-data="singleWellData"
          :x-prop-name="xPropName"
          :y-prop-name="yPropName"
        /> -->
      </g>
    </svg>
    <line-chart-legend />
  </div>
</template>

<script>
import * as d3 from 'd3';
import BenchmarkLine from './BenchmarkLine';
import LineChartAxis from './LineChartAxis';
import LineChartFormation from './LineChartFormation';
import LineChartLabel from './LineChartLabel';
import LineChartLegend from './LineChartLegend';
import LineChartLine from './LineChartLine';
import LineChartTooltip from './LineChartTooltip';

export default {
  name: 'line-chart-container',
  components: {
    BenchmarkLine,
    LineChartAxis,
    LineChartFormation,
    LineChartLabel,
    LineChartLegend,
    LineChartLine,
    LineChartTooltip,
  },
  data() {
    return {
      layout: {
        width: 600,
        height: 500,
        marginTop: 45,
        marginRight: 35,
        marginBottom: 50,
        marginLeft: 75,
      },
      axes: ['left', 'top'],
    };
  },
  computed: {
    currentWell() {
      return this.$store.state.currentWell;
    },
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
      return d3.max(this.currentWell.benchmarkInputByPortionInfo, well => well.drilledHours);
    },
    yMax() {
      return this.$store.getters.yMax;
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
