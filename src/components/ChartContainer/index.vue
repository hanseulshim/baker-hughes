<template>
  <div>
    <svg :view-box.camel="viewBox" preserveAspectRatio="xMidYMid meet">
      <g :style="stageStyle">
        <chart-axis
          v-for="(axis, index) in axes"
          :key="index + axis"
          :axis="axis"
          :layout="layout"
          :scale="scale"
        />
        <chart-series
          v-for="(seriesData, index) in chartData"
          :key="index + seriesData.well"
          :series-data="seriesData"
          :layout="layout"
          :scale="scale"
          :color="scale.color(index)"
          :xPropName="xPropName"
          :yPropName="yPropName"
        />
      </g>
    </svg>
  </div>
</template>

<script>
import * as d3 from 'd3';
import ChartAxis from './ChartAxis';
import ChartSeries from './ChartSeries';

export default {
  name: 'chart-container',
  components: {
    ChartAxis,
    ChartSeries,
  },
  props: [
    'axes',
    'layout',
    'chart-data',
    'xPropName',
    'yPropName',
  ],
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
        .domain(d3.extent(this.chartData[0].data, d => d[this.xPropName]))
        .range([0, this.layout.width]);
    },
    getScaleY() {
      return d3.scaleLinear()
        .domain(d3.extent(this.chartData.reduce((a, b) =>
          a.concat(b.data), []), d => d[this.yPropName]))
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

<style>

</style>
