<template>
  <div id="area-chart-container" ref="container">
    <info />
    <svg :view-box.camel="viewBox" preserveAspectRatio="xMidYMid meet">
      <g :style="stageStyle">
        <rect
          :width="layout.width"
          :height="layout.height"
          fill="#F9F9F9"
        />
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
      axes: ['left', 'top'],
      layout: {
        width: 150,
        marginRight: 50,
        marginLeft: 20,
        ...this.verticalLayout,
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
      return this.$store.getters.maxSlope;
    },
  },
  methods: {
    getScaleX() {
      return d3.scaleLinear()
        .domain([this.xDomain.min, this.xDomain.max])
        .range([0, this.layout.width]);
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

<style lang="sass" scoped>
#area-chart-container
  display: flex
  flex-direction: column
  align-items: center
</style>
