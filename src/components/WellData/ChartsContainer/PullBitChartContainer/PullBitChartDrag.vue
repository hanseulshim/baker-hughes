<template>
  <g class='pull-bits'
    @mousemove="drag"
  >
    <g
      v-for="(bit, index) in drillBits"
      :key="`${index}-${bit.bitType}`"
    >
      <text
        :y="scale.y(bit.depthIn)"
        :dy="5"
        :dx="-45"
        :style="textStyle"
      >
        Pull Bit
      </text>
      <rect
        x="-2.5"
        :y="scale.y(bit.depthIn)"
        :width="layout.width + 5"
        :height="5"
        rx="2"
        @mousedown="startDrag"
      />
    </g>
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
      currentMove: null,
    };
  },
  computed: {
    drillBits() {
      return this.$store.getters.drillBits;
    },
  },
  methods: {
    startDrag(e) {
      this.currentMove = e.target;
    },
    drag(e) {
      if (this.currentMove) {
        this.currentMove.y = e.clientY;
      }
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
