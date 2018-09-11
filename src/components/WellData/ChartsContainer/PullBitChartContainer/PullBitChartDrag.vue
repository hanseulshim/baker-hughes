<template>
  <g class='pull-bits'>
    <g
      v-for="(bit, index) in drillBits"
      :key="`${index}-${bit.bitType}`"
    >
      <text
        :y="getCoords(bit).y"
        :dy="3"
        :dx="-45"
        :style="textStyle"
      >
        Pull Bit
      </text>
      <circle
        :cx="layout.width / 2"
        :cy="getCoords(bit).y"
        :r="5"
      />
    </g>
  </g>
</template>

<script>
export default {
  name: 'line-chart-line',
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
    };
  },
  methods: {
    getCoords(bit) {
      return {
        y: this.scale.y(bit.depthIn),
      };
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
