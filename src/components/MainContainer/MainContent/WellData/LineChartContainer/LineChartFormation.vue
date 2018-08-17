<template>
  <g>
    <rect ref="rect"></rect>
    <text ref="formation" v-if="widthBetween > 230">{{formationData.formation}}</text>
  </g>
</template>

<script>
import * as d3 from 'd3';

export default {
  name: 'line-chart-formation',
  props: {
    color: {
      type: String,
      required: true,
    },
    layout: {
      type: Object,
      required: true,
    },
    formationData: {
      type: Object,
      required: true,
    },
    nextFormation: {
      type: Object,
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
  },
  mounted() {
    this.createFormation();
  },
  computed: {
    width() {
      return this.layout.width - this.scale.x(this.formationData[this.xPropName]);
    },
    x() {
      return this.scale.x(this.formationData[this.xPropName]);
    },
    widthBetween() {
      const width = this.nextFormation[this.xPropName] - this.formationData[this.xPropName];
      if (width === 0) {
        return this.layout.width - width;
      }
      return width;
    },
  },
  methods: {
    createFormation() {
      d3.select(this.$refs.rect)
        .attr('width', this.width)
        .attr('height', this.layout.height)
        .attr('x', this.x)
        .attr('fill', this.color);
      d3.select(this.$refs.formation)
        .attr('y', this.x + 12)
        .attr('x', -5)
        .attr('text-anchor', 'end')
        .attr('transform', 'rotate(-90)')
        .style('font-size', '50%');
    },
  },
};
</script>
