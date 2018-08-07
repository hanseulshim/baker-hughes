<template>
  <div class='cost-chart-container'>
    <div class='chart-container' :class='chartAccessor' :ref='chartAccessor'>
    </div>
  </div>
</template>

<script>
import * as d3 from 'd3';

export default {
  name: 'cost-chart',
  props: {
    sortedData: {
      type: Array,
      required: true,
    },
    rawData: {
      type: Array,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    xLabel: {
      type: String,
      required: true,
    },
    xData: {
      type: String,
      required: true,
    },
    chartAccessor: {
      type: String,
      required: true,
    },
  },
  mounted() {
    this.createGraph();
  },
  data() {
    return {
      margin: {
        top: 25,
        right: 25,
        bottom: 50,
        left: 80,
      },
    };
  },
  computed: {
    width() {
      return this.$refs[this.chartAccessor].clientWidth - this.margin.left - this.margin.right;
    },
    height() {
      return 500 - this.margin.top - this.margin.bottom;
    },
    svg() {
      return d3.select(`.${this.chartAccessor}`)
        .append('svg')
        .attr('width', this.width + this.margin.left + this.margin.right)
        .attr('height', this.height + this.margin.top + this.margin.bottom)
        .append('g')
        .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);
    },
    xScale() {
      return d3.scaleLinear()
        .domain(d3.extent(this.rawData, d => d[this.xData]))
        .range([0, this.width])
        .nice();
    },
    yScale() {
      return d3.scaleLinear()
        .domain(d3.extent(this.rawData, d => d.cumulativeCost))
        .range([this.height, 0])
        .nice();
    },
  },
  methods: {
    createGraph() {
      const line = d3.line()
        .x(d => this.xScale(d[this.xData]))
        .y(d => this.yScale(d.cumulativeCost));

      this.sortedData.forEach((well, i) => {
        this.svg.append('path')
          .datum(well.data)
          .attr('fill', 'none')
          .attr('stroke', d3.schemeCategory10[i])
          .attr('stroke-linejoin', 'round')
          .attr('stroke-linecap', 'round')
          .attr('stroke-width', 2)
          .attr('d', line);
      });
      this.createAxis();
      this.createLabels();
    },
    createAxis() {
      const xAxis = d3.axisBottom()
        .scale(this.xScale)
        .ticks(4);
      const yAxis = d3.axisLeft()
        .scale(this.yScale)
        .tickFormat(d => `$${d}`)
        .ticks(4);
      this.svg.append('g')
        .attr('transform', `translate(0, ${this.height})`)
        .call(xAxis);
      this.svg.append('g')
        .call(yAxis);
    },
    createLabels() {
      this.svg.append('text')
        .attr('x', (this.width / 2))
        .attr('y', 0 - (this.margin.top / 2))
        .attr('text-anchor', 'middle')
        .style('font-size', '16px')
        .style('text-decoration', 'underline')
        .text(this.title);

      this.svg.append('text')
        .attr('x', (this.width / 2))
        .attr('y', this.height + (this.margin.top * 1.5))
        .attr('text-anchor', 'middle')
        .style('font-size', '16px')
        .text(this.xLabel);

      this.svg.append('text')
        .attr('x', -(this.width / 2) + this.margin.left)
        .attr('y', -(this.margin.bottom * 1.2))
        .attr('transform', 'rotate(-90)')
        .style('font-size', '16px')
        .text('Cost ($)');
    },
    createLegend() {

    },
  },

};
</script>

<style lang='sass' scoped>
  .cost-chart-container
    border: 1px solid blue
    margin: auto
    width: 800px
    padding: 10px
  .chart-container
    width: 100%
</style>
