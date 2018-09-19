<template>
  <div class="chart-container" ref="container">
    <info />
    <svg :view-box.camel="viewBox" preserveAspectRatio="xMidYMid meet">
      <g :style="stageStyle">
        <bubble-chart-label
          :layout="layout"
          :scale="scale"
        />
        <bubble-chart-bubbles
          :layout="layout"
          :scale="scale"
        />
        <bubble-chart-axis
          v-for="(axis, index) in axes"
          :key="index + axis"
          :axis="axis"
          :layout="layout"
          :scale="scale"
        />
      </g>
    </svg>
  </div>
</template>

<script>
import * as d3 from 'd3';
import Info from './Info';
import BubbleChartAxis from './BubbleChartAxis';
import BubbleChartBubbles from './BubbleChartBubbles';
import BubbleChartLabel from './BubbleChartLabel';

export default {
  name: 'bubble-chart-container',
  components: {
    Info,
    BubbleChartAxis,
    BubbleChartBubbles,
    BubbleChartLabel,
  },
  data() {
    return {
      layout: {
        width: 800,
        height: 600,
        marginRight: 20,
        marginLeft: 75,
        marginTop: 30,
        marginBottom: 50,
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
      return this.$store.getters.combinedWells.maxTime;
    },
    yMax() {
      return this.$store.getters.combinedWells.maxDepth;
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
        .range([0, this.layout.height]);
    },
  },
  watch: {
    layout: {
      deep: true,
      handler() {
        this.scale.x = this.getScaleX();
        this.scale.y = this.yScale();
      },
    },
  },
};
</script>

<style lang="sass">
.chart-container
  display: flex
  flex-direction: column
  align-items: center
</style>
