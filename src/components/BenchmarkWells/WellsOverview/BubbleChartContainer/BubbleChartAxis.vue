<template>
  <g>
    <g :class="[classList]" ref="axis" :style="style" />
    <g ref="gridX" />
    <g ref="gridY" />
  </g>
</template>

<script>
import * as d3 from 'd3';

export default {
  name: 'bubble-chart-axis',
  props: {
    axis: {
      type: String,
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
  },
  data() {
    return {
      classList: ['axis'].concat(this.getAxisClasses()),
    };
  },
  mounted() {
    this.drawAxis();
    this.drawGrid();
  },
  computed: {
    style() {
      return {
        transform: this.getAxisTransform(),
      };
    },
  },
  methods: {
    getAxisClasses() {
      const axis = {
        top: 'x',
        bottom: 'x',
        left: 'y',
        right: 'y',
      };
      return [this.axis, axis[this.axis]];
    },
    drawAxis() {
      const $axis = d3.select(this.$refs.axis);
      const scale = this.scale;
      const axisGenerator = {
        top: d3.axisTop(scale.x).ticks(3),
        right: d3.axisRight(scale.y),
        bottom: d3.axisBottom(scale.x),
        left: d3.axisLeft(scale.y).ticks(3).tickSizeOuter(0),
      };
      $axis.call(axisGenerator[this.axis]);
    },
    drawGrid() {
      const $gridX = d3.select(this.$refs.gridX);
      const $gridY = d3.select(this.$refs.gridY);
      $gridX.call(
        d3.axisTop(this.scale.x).ticks(3).tickFormat('')
          .tickSize(-this.layout.height));
      $gridY.call(
        d3.axisLeft(this.scale.y).ticks(2).tickFormat('').tickSize(-this.layout.width)
          .tickSizeOuter(0));
    },
    getAxisTransform() {
      const axisOffset = {
        top: { x: 0, y: 0 },
        right: { x: this.layout.width, y: 0 },
        bottom: { x: 0, y: this.layout.height },
        left: { x: 0, y: 0 },
      };
      return `translate(${axisOffset[this.axis].x}px, ${axisOffset[this.axis].y}px)`;
    },
  },
  watch: {
    scale: {
      deep: true,
      handler() {
        this.drawAxis();
      },
    },
  },
};
</script>

<style lang="sass">
.axis line
  stroke: #202020
.axis path
  stroke: #202020
.axis text
  fill: #202020
</style>
