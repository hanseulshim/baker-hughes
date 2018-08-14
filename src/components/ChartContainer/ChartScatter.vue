<template>
  <g class="points">
    <chart-point
      v-for="(pointData, index) in seriesData.data"
      :key="index + seriesData.well"
      :point-data="pointData"
      :layout="layout"
      :scale="scale"
      :color="color"
      :xPropName="xPropName"
      :yPropName="yPropName"
    />
  </g>
</template>

<script>
import ChartPoint from './ChartPoint';
// v-if="typeof pointData[xPropName] !== typeof null"
export default {
  name: 'chart-scatter',
  components: {
    ChartPoint,
  },
  props: ['layout', 'series-data', 'scale', 'color', 'xPropName', 'yPropName'],
  watch: {
    scale: {
      deep: true,
      handler: () => {},
    },
  },
};
</script>
