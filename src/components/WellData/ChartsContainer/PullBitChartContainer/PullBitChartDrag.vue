<template>
  <g class='pull-bits'
  >
    <text
      v-for="(bit, index) in drillBits"
      :key="`${index}-${bit.bitType}`"
      x="-50"
      :y="textPositions[index] ? textPositions[index] + 7 : 0"
      :style="textStyle"
    >
      Pull Bit {{index + 1}}
    </text>
  </g>
</template>

<script>
import * as d3 from 'd3';

export default {
  name: 'pull-bit-chart-drag',
  props: {
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
      textStyle: {
        fontSize: '.65em',
        strokeWidth: 0.3,
      },
      textPositions: [],
    };
  },
  mounted() {
    this.setBitPulls();
    this.setTextPositions();
  },
  methods: {
    dragBit(d, i, a) {
      if (d3.event.y >= 0 && d3.event.y <= this.layout.height) {
        this.textPositions.splice(i, 1, d3.event.y);
        d3.select(a[i])
          .attr('y', d3.event.y);
      }
    },
    setBitPulls() {
      const rect = d3.select('.pull-bits')
        .selectAll('rect')
        .data(this.drillBits)
        .enter()
        .append('rect')
        .attr('x', -2.5)
        .attr('y', d => this.scale.y(d.depthIn))
        .attr('width', this.layout.width + 5)
        .attr('height', 7)
        .attr('cursor', 'pointer')
        .attr('rx', 2);
      const drag = d3.drag()
        .on('drag', (d, i, a) => this.dragBit(d, i, a));
      drag(rect);
    },
    setTextPositions() {
      this.textPositions = this.drillBits.map(bit => this.scale.y(bit.depthIn));
    },
  },
  computed: {
    drillBits() {
      return this.$store.getters.drillBits;
    },
  },
  watch: {
    scale: {
      deep: true,
      handler() {
      },
    },
  },
};
</script>

