<template>
  <div class="chart-container" ref="container">
    <info />
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
  </div>
</template>

<script>
import * as d3 from 'd3';
import Info from './Info';
import LineChartAxis from './LineChartAxis';
import LineChartFormation from './LineChartFormation';
import LineChartLabel from './LineChartLabel';
import LineChartLine from './LineChartLine';
import LineChartTooltip from './LineChartTooltip';

export default {
  name: 'line-chart-container',
  components: {
    Info,
    LineChartAxis,
    LineChartFormation,
    LineChartLabel,
    LineChartLine,
    LineChartTooltip,
  },
  props: {
    verticalLayout: {
      type: Object,
      required: true,
    },
    yScale: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      layout: {
        width: 650,
        marginRight: 20,
        marginLeft: 75,
        ...this.verticalLayout,
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
        y: this.yScale(),
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
  },
  methods: {
    getScaleX() {
      return d3.scaleLinear()
        .domain([0, this.xMax * 1.25])
        .range([0, this.layout.width])
        .nice();
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
