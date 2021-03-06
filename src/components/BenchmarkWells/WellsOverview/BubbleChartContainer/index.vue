<template>
  <div class="chart-container" ref="container">
    <info />
    <well-detail />
    <svg :view-box.camel="viewBox" preserveAspectRatio="xMidYMid meet">
      <g :style="stageStyle">
        <bubble-chart-label
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
        <bubble-chart-bubbles
          :layout="layout"
          :scale="scale"
        />
        <bubble-chart-legend
          :layout="layout"
          :scale="scale"
        />
      </g>
    </svg>
  </div>
</template>

<script>
import * as d3 from 'd3';
import BubbleChartAxis from './BubbleChartAxis';
import BubbleChartBubbles from './BubbleChartBubbles';
import BubbleChartLabel from './BubbleChartLabel';
import BubbleChartLegend from './BubbleChartLegend';
import Info from './Info';
import WellDetail from './WellDetail';

export default {
  name: 'bubble-chart-container',
  components: {
    BubbleChartAxis,
    BubbleChartBubbles,
    BubbleChartLabel,
    BubbleChartLegend,
    Info,
    WellDetail,
  },
  data() {
    return {
      layout: {
        width: 800,
        height: 400,
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
        r: this.getScaleR(),
        x: this.getScaleX(),
        y: this.getScaleY(),
      };
    },
    stageStyle() {
      return {
        transform: `translate(${this.layout.marginLeft}px, ${this.layout.marginTop}px)`,
      };
    },
    rMax() {
      return this.$store.getters.combinedWells.maxCost;
    },
    rMin() {
      return this.$store.getters.combinedWells.minCost;
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
    yMin() {
      return this.$store.getters.combinedWells.minDepth;
    },
  },
  methods: {
    getScaleR() {
      return d3.scaleSqrt()
        .domain([this.rMin, this.rMax])
        .range([10, 40]);
    },
    getScaleX() {
      return d3.scaleLinear()
        .domain([0, this.xMax * 1.25])
        .range([0, this.layout.width])
        .nice();
    },
    getScaleY() {
      return d3.scaleLinear()
        .domain([this.yMin * 0.99, this.yMax * 1.02])
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
  position: relative
</style>
