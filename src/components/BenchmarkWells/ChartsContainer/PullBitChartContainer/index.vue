<template>
  <div class="chart-container" ref="container">
    <div class="reset-container">
      <i class="material-icons">refresh</i>
      <span>Reset</span>
    </div>
    <svg :view-box.camel="viewBox" preserveAspectRatio="xMidYMid meet">
      <g :style="stageStyle">
        <rect
          :width="layout.width"
          :height="layout.height"
          fill="#ECECEC"
        />
        <pull-bit-chart-drag
          :layout="layout"
          :scale="scale"
        />
      </g>
    </svg>
  </div>
</template>

<script>
import * as d3 from 'd3';
import PullBitChartDrag from './PullBitChartDrag';

export default {
  name: 'pull-bit-chart-container',
  components: {
    PullBitChartDrag,
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
        chartWidth: 50,
        width: 10,
        marginRight: 10,
        marginLeft: 10,
        ...this.verticalLayout,
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
        transform: `translate(${this.layout.chartWidth}px, ${this.layout.marginTop}px)`,
      };
    },
    viewBox() {
      const outerWidth = this.layout.chartWidth + this.layout.marginLeft + this.layout.marginRight;
      const outerHeight = this.layout.height + this.layout.marginTop + this.layout.marginBottom;
      return `0 0 ${outerWidth} ${outerHeight}`;
    },
    width() {
      return `${this.layout.chartWidth + this.layout.marginLeft + this.layout.marginRight}px`;
    },
    xMax() {
      return this.$store.getters.maxSlope;
    },
  },
  methods: {
    getScaleX() {
      return d3.scaleLinear()
        .domain([0, 5])
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
.reset-container
  display: flex
  align-items: center
  font-weight: bold
  font-size: .8em
  cursor: pointer
  .material-icons
    margin-right: .1em
    font-size: 1.3em
</style>
