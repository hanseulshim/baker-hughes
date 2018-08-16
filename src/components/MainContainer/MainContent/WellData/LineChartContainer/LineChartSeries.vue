<template>
  <g ref="lineChart">
    <line-chart-line
      :color="color"
      :layout="layout"
      :line-data="lineData"
      :scale="scale"
      :x-max="xMax"
      :x-prop-name="xPropName"
      :y-prop-name="yPropName"
    />
    <g ref="hoverWell" :style="style">
      <circle :r="4.5"></circle>
      <text text-anchor="middle" dy="-10">fadbiadfijboi</text>
    </g>
  </g>
</template>

<script>
import * as d3 from 'd3';
import LineChartLine from './LineChartLine';

export default {
  name: 'line-chart-series',
  components: {
    LineChartLine,
  },
  props: {
    color: {
      type: String,
      required: true,
    },
    layout: {
      type: Object,
      required: true,
    },
    lineData: {
      type: Array,
      required: true,
    },
    scale: {
      type: Object,
      required: true,
    },
    xPropName: {
      type: String,
      required: true,
    },
    xMax: {
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
      style: {
        display: 'none',
      },
    };
  },
  computed: {
    hoverWell() {
      return d3.select(this.$refs.hoverWell);
    },
  },
  mounted() {
    this.createTooltips();
  },
  methods: {
    createTooltips() {
      d3.select(this.$refs.lineChart)
        .on('mouseover', () => {
          this.hoverWell.style('display', null);
        })
        .on('mouseout', () => {
          this.hoverWell.style('display', 'none');
        })
        .on('mousemove', this.mousemove);
    },
    mousemove() {
      const xValue = this.scale.x.invert(d3.mouse(this.$refs.lineChart)[0]);
      const bisector = d3.bisector(d => d[this.xPropName]).left;
      const indexWell = bisector(this.lineData, xValue);
      const dataWell = this.lineData[indexWell];
      const xCoordWell = this.scale.x(dataWell[this.xPropName]);
      const yCoordWell = this.scale.y(dataWell[this.yPropName]);
      this.hoverWell
        .attr('transform', `translate(${xCoordWell}, ${yCoordWell})`)
        .select('text').text(dataWell[this.xPropName]);
    },
  },
};
</script>
