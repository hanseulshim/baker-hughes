<template>
  <g class='bit-change'>
    <circle
      v-for="(pointData, index) in bitChangeData"
      :key="index + pointData.bitType"
      :cx="scale.x(pointData.drilledHours)"
      :cy="scale.y(pointData.depthIn)"
      :r="5"
      :style="style"
    />
  </g>
</template>

<script>
export default {
  name: 'bit-change-points',
  props: {
    scale: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      style: {
        fill: '#000',
        stroke: '#000',
        strokeWidth: 2,
      },
    };
  },
  computed: {
    bitChangeData() {
      return this.$store.state.currentWell.drillBits;
    },
  },
  watch: {
    scale: {
      deep: true,
      handler: () => {},
    },
  },
};
</script>
