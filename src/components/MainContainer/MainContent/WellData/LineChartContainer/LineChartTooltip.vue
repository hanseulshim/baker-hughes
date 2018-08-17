<template>
  <g>
    <g ref="hoverWell" :style="style">
      <circle :r="5"></circle>
    </g>
    <g ref="hoverBenchmark" :style="style">
      <circle :r="5"></circle>
    </g>
    <path ref="hoverLine" :style="style"/>
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
        opacity: 0,
        fill: 'none',
        stroke: '#006FFF',
        strokeWidth: 1,
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
    hoverLine() {
      return d3.select(this.$refs.hoverLine);
    },
    legend() {
      return d3.select('#line-chart-legend');
    },
    legendDepth() {
      return d3.select('#line-chart-legend-depth');
    },
    legendWellTime() {
      return d3.select('#line-chart-legend-well-time');
    },
    legendBenchmarkTime() {
      return d3.select('#line-chart-legend-benchmark-time');
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
          this.hoverWell.style('opacity', 1);
          this.hoverBenchmark.style('opacity', 1);
          this.hoverLine.style('opacity', 1);
          this.legend.style('opacity', 1);
        })
        .on('mouseout', () => {
          this.hoverWell.style('opacity', 0);
          this.hoverBenchmark.style('opacity', 0);
          this.hoverLine.style('opacity', 0);
          this.legend.style('opacity', 0);
        })
        .on('mousemove', this.mousemove);
    },
    mousemove() {
      const xValue = this.scale.x.invert(d3.mouse(this.$refs.rect)[0]);
      const bisector = d3.bisector(d => d[this.xPropName]).left;
      const indexWell = bisector(this.singleWellData, xValue) === this.singleWellData.length ?
        bisector(this.singleWellData, xValue) - 1 : bisector(this.singleWellData, xValue);
      const indexBenchmark = bisector(this.benchmarkData, xValue) === this.benchmarkData.length ?
        bisector(this.benchmarkData, xValue) - 1 : bisector(this.benchmarkData, xValue);
      const dataWell = this.singleWellData[indexWell];
      const dataBenchmark = this.benchmarkData[indexBenchmark];
      const xCoordWell = this.scale.x(dataWell[this.xPropName]);
      const yCoordWell = this.scale.y(dataWell[this.yPropName]);
      const yCoordBenchmark = this.scale.y(dataBenchmark[this.yPropName]);
      this.hoverWell.attr('transform', `translate(${xCoordWell}, ${yCoordWell})`);
      this.hoverBenchmark.attr('transform', `translate(${xCoordWell}, ${yCoordBenchmark})`);
      this.hoverLine.attr('d', () => `M${xCoordWell},${this.layout.height} ${xCoordWell},${yCoordWell}`);
      this.legendDepth.html(Math.round(xCoordWell * 100) / 100);
      this.legendWellTime.html(Math.round(yCoordWell * 100) / 100);
      this.legendBenchmarkTime.html(Math.round(yCoordBenchmark * 100) / 100);
    },
  },
};
</script>
