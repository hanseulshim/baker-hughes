<template>
  <div class="chart-container" ref="container">
    <div>reset</div>
    <svg :view-box.camel="viewBox" preserveAspectRatio="xMidYMid meet">
      <g :style="stageStyle"></g>
        <circle
          :cx="0"
          :cy="0"
          r=5
        />
        <!-- <area-chart-line
          :layout="layout"
          :scale="scale"
          :xDomain="xDomain"
        />
        <area-chart-label
          :layout="layout"
          :scale="scale"
        />
        -->
        <!--
        <area-chart-tooltip
          :layout="layout"
          :scale="scale"
        /> -->
      </g>
    </svg>
  </div>
</template>

<script>
import * as d3 from 'd3';
// import AreaChartLabel from './AreaChartLabel';
// import AreaChartLine from './AreaChartLine';
// import AreaChartTooltip from './AreaChartTooltip';

export default {
  name: 'pull-bit-chart-container',
  components: {
    // AreaChartLabel,
    // AreaChartLine,
    // AreaChartTooltip,
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
