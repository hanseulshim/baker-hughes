<template>
  <g :class="[classList]" ref="axis" :style="style" />
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
        top: 'x bubble',
        bottom: 'x bubble',
        left: 'y bubble',
        right: 'y bubble',
      };
      return [this.axis, axis[this.axis]];
    },
    drawAxis() {
      const $axis = d3.select(this.$refs.axis);
      const scale = this.scale;
      const axisGenerator = {
        top: d3.axisTop(scale.x).ticks(3).tickSize(-this.layout.height).tickSizeOuter(0),
        right: d3.axisRight(scale.y),
        bottom: d3.axisBottom(scale.x),
        left: d3.axisLeft(scale.y).ticks(3).tickSize(-this.layout.width).tickSizeOuter(0),
      };
      $axis.call(axisGenerator[this.axis]);
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
.axis.bubble line
  stroke: #C1C1C1
.axis.bubble path
  stroke: #202020
.axis.bubble text
  fill: #202020
g.axis.bubble > g:nth-child(2) > line
  display: none
</style>
