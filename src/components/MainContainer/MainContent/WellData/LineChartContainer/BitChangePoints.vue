<template>
  <g>
    <circle
      :style="style"
      v-for="(pointData, index) in bitChangeData"
      :key="index + pointData.bitType"
      :cx="scale.x(pointData[xPropName])"
      :cy="scale.y(pointData[yPropName])"
      :r="5"
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
    xPropName: {
      type: String,
      required: true,
    },
    yPropName: {
      type: String,
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
