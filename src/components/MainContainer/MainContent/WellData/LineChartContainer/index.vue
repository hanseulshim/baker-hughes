<template>
  <div id="line-chart-container">
    <svg :view-box.camel="viewBox" preserveAspectRatio="xMidYMid meet">
      <g :style="stageStyle">
        <line-chart-label
          :layout="layout"
        />
        <line-chart-axis
          v-for="(axis, index) in axes"
          :key="index + axis"
          :axis="axis"
          :layout="layout"
          :scale="scale"
        />
        <benchmark-line
          :layout="layout"
          :line-data="benchmarkData"
          :scale="scale"
          :x-max="xMax"
          :x-prop-name="xPropName"
          :y-prop-name="yPropName"
        />
        <line-chart-series
          v-for="(lineData, index) in wellData"
          :key="index + lineData[0].well"
          :index="index"
          :color="scale.color(index)"
          :layout="layout"
          :line-data="lineData"
          :scale="scale"
          :x-prop-name="xPropName"
          :x-max="xMax"
          :y-prop-name="yPropName"
        />
        <line-chart-tooltip
          :benchmark-data="benchmarkData"
          :layout="layout"
          :scale="scale"
          :single-well-data="singleWellData"
          :x-prop-name="xPropName"
          :y-prop-name="yPropName"
        />
        <bit-change-points
          :bit-change-data="bitChangeData"
          :scale="scale"
          :x-prop-name="xPropName"
          :y-prop-name="yPropName"
        />
      </g>
    </svg>
    <line-chart-legend />
  </div>
</template>

<script>
import * as d3 from 'd3';
import BenchmarkLine from './BenchmarkLine';
import BitChangePoints from './BitChangePoints';
import LineChartAxis from './LineChartAxis';
import LineChartLabel from './LineChartLabel';
import LineChartSeries from './LineChartSeries';
import LineChartTooltip from './LineChartTooltip';
import LineChartLegend from './LineChartLegend';

export default {
  name: 'line-chart-container',
  components: {
    BenchmarkLine,
    BitChangePoints,
    LineChartAxis,
    LineChartLabel,
    LineChartSeries,
    LineChartTooltip,
    LineChartLegend,
  },
  props: {
    axes: {
      type: Array,
      required: true,
    },
    benchmarkData: {
      type: Array,
      required: true,
    },
    bitChangeData: {
      type: Array,
      required: true,
    },
    layout: {
      type: Object,
      required: true,
    },
    singleWellData: {
      type: Array,
      required: true,
    },
    wellData: {
      type: Array,
      required: true,
    },
    xMax: {
      type: Number,
      required: true,
    },
    xPropName: {
      type: String,
      required: true,
    },
    yMax: {
      type: Number,
      required: true,
    },
    yPropName: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      scale: {
        x: this.getScaleX(),
        y: this.getScaleY(),
        color: d3.scaleOrdinal(d3.schemeCategory10),
      },
    };
  },
  computed: {
    viewBox() {
      const outerWidth = this.layout.width + this.layout.marginLeft + this.layout.marginRight;
      const outerHeight = this.layout.height + this.layout.marginTop + this.layout.marginBottom;
      return `0 0 ${outerWidth} ${outerHeight}`;
    },
    stageStyle() {
      return {
        transform: `translate(${this.layout.marginLeft}px, ${this.layout.marginTop}px)`,
      };
    },
  },
  methods: {
    getScaleX() {
      return d3.scaleLinear()
        .domain([0, this.xMax])
        .range([0, this.layout.width])
        .nice();
    },
    getScaleY() {
      return d3.scaleLinear()
        .domain([0, this.yMax])
        .range([this.layout.height, 0])
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
