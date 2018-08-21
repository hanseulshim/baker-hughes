<template>
  <g>
    <circle
      v-for="(pointData, index) in bitChangeData"
      :key="index + pointData.bitType"
      :cx="scale.x(pointData.depthOut)"
      :cy="scale.y(pointData.drilledHours)"
      :r="5"
      :style="style"
    />
  </g>
</template>

<script>
export default {
  name: 'bit-change-points',
  props: {
    bitChangeData: {
      type: Array,
      required: true,
    },
    scale: {
      type: Object,
      required: true,
    },
  },
  computed: {
    style() {
      return {
        fill: '#000',
        stroke: '#000',
        strokeWidth: 2,
      };
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
