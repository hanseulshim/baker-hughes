<template>
  <g class='labels'>
    <g
      v-for="(bit, index) in drillBits"
      :key="index + bit.bitType"
    >
      <path
        :style="lineStyle"
        :d="`M${0},${scale.y(bit.depthIn)} ${layout.width},${scale.y(bit.depthIn)}`"/>
      <text
        class="chart-line-label"
        :x="layout.width + 5"
        :y="scale.y(bit.depthIn) + 2"
      >
        {{getDepth(bit.depthIn)}} ft
      </text>
    </g>
  </g>
</template>

<script>
import numeral from 'numeral';

export default {
  name: 'area-chart-label',
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
      lineStyle: {
        stroke: '#828488',
      },
    };
  },
  computed: {
    drillBits() {
      return this.$store.getters.drillBits;
    },
  },
  methods: {
    getDepth(depth) {
      return numeral(depth).format('0,0');
    },
  },
};
</script>
