<template>
  <div id="cost-depth-chart">
    <div class='container'>
    </div>
  </div>
</template>

<script>
import * as d3 from 'd3';

export default {
  name: 'cost-depth-chart',
  props: ['depthCostData', 'data'],
  mounted() {
    this.createGraph();
  },
  methods: {
    createGraph() {
      const margin = { top: 25, right: 25, bottom: 50, left: 80 };
      const height = 500 - margin.top - margin.bottom;
      const width = parseInt(d3.select('.container').style('width'), 10) - margin.left - margin.right;
      const svg = d3.select('.container')
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);

      const xScale = d3.scaleLinear()
        .domain(d3.extent(this.data, d => d.cumulativeDepth))
        .range([0, width])
        .nice();
      const yScale = d3.scaleLinear()
        .domain(d3.extent(this.data, d => d.cumulativeCost))
        .range([height, 0])
        .nice();
      const xAxis = d3.axisBottom()
        .scale(xScale)
        .ticks(4);
      const yAxis = d3.axisLeft()
        .scale(yScale)
        .tickFormat(d => `$${d}`)
        .ticks(4);

      const line = d3.line()
        .x(d => xScale(d.cumulativeDepth))
        .y(d => yScale(d.cumulativeCost));

      this.depthCostData.forEach((well, i) => {
        svg.append('path')
          .datum(well.data)
          .attr('fill', 'none')
          .attr('stroke', d3.schemeCategory10[i])
          .attr('stroke-linejoin', 'round')
          .attr('stroke-linecap', 'round')
          .attr('stroke-width', 1.5)
          .attr('d', line);
      });

      svg.append('g')
        .attr('transform', `translate(0, ${height})`)
        .call(xAxis);
      svg.append('g')
        .call(yAxis);

      svg.append('text')
        .attr('x', (width / 2))
        .attr('y', 0 - (margin.top / 2))
        .attr('text-anchor', 'middle')
        .style('font-size', '16px')
        .style('text-decoration', 'underline')
        .text('Cost over Depth');

      svg.append('text')
        .attr('x', (width / 2))
        .attr('y', height + (margin.top * 1.5))
        .attr('text-anchor', 'middle')
        .style('font-size', '16px')
        .style('text-decoration', 'underline')
        .text('Depth (ft)');

      svg.append('text')
        .attr('x', -(width / 2) + margin.left)
        .attr('y', -(margin.bottom * 1.2))
        .attr('transform', 'rotate(-90)')
        .style('font-size', '16px')
        .style('text-decoration', 'underline')
        .text('Cost ($)');
    },
  },

};
</script>

<style lang="sass" scoped>
  #cost-depth-chart
    border: 1px solid blue
    margin: auto
    width: 800px
    padding: 10px
  .container
    width: 100%
</style>
