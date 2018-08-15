<template>
  <g ref="gContainer">
    <g ref="hoverWell" :style="style">
      <circle :r="4.5"></circle>
      <text text-anchor="middle" dy="-10">;olol</text>
    </g>
    <g ref="hoverBenchmark" :style="style">
      <circle :r="4.5"></circle>
      <text text-anchor="middle" dy="-10">fadbiadfijboi</text>
    </g>
    <rect ref="rect"/>
  </g>
</template>

<script>
import * as d3 from 'd3';

export default {
  name: 'line-chart-tooltip',
  props: {
    benchmarkData: {
      type: Array,
      required: true,
    },
    layout: {
      type: Object,
      required: true,
    },
    scale: {
      type: Object,
      required: true,
    },
    singleWellData: {
      type: Array,
      required: true,
    },
    xPropName: {
      type: String,
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
    hoverBenchmark() {
      return d3.select(this.$refs.hoverBenchmark);
    },
  },
  mounted() {
    this.createTooltips();
  },
  methods: {
    createTooltips() {
      d3.select(this.$refs.rect)
        .attr('width', this.layout.width)
        .attr('height', this.layout.height)
        .attr('fill', 'none')
        .attr('pointer-events', 'all')
        .on('mouseover', () => {
          this.hoverWell.style('display', null);
          this.hoverBenchmark.style('display', null);
        })
        .on('mouseout', () => {
          this.hoverWell.style('display', 'none');
          this.hoverBenchmark.style('display', 'none');
        })
        .on('mousemove', this.mousemove);
    },
    mousemove() {
      const xValue = this.scale.x.invert(d3.mouse(this.$refs.rect)[0]);
      const bisector = d3.bisector(d => d[this.xPropName]).left;
      const indexWell = bisector(this.singleWellData, xValue);
      const indexBenchmark = bisector(this.benchmarkData, xValue);
      const dataWell = this.singleWellData[indexWell];
      const dataBenchmark = this.benchmarkData[indexBenchmark];
      const xCoordWell = this.scale.x(dataWell[this.xPropName]);
      const xCoordBenchmark = this.scale.x(dataBenchmark[this.xPropName]);
      const yCoordWell = this.scale.y(dataWell[this.yPropName]);
      const yCoordBenchmark = this.scale.y(dataBenchmark[this.yPropName]);
      this.hoverWell
        .attr('transform', `translate(${xCoordWell}, ${yCoordWell})`)
        .select('text').text(dataWell[this.xPropName]);
      this.hoverBenchmark
        .attr('transform', `translate(${xCoordBenchmark}, ${yCoordBenchmark})`)
        .select('text').text(dataBenchmark[this.xPropName]);
    },
  },
};
</script>

