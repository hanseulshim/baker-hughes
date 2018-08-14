<template>
  <g class="d3__series">
    <!-- <d3__area
      :layout="layout"
      :series-data="this.seriesData"
      :scale="this.scale">
    </d3__area> -->
    <chart-line
      :layout="layout"
      :series-data="seriesData"
      :scale="scale"
      :color="color"
      :xPropName="xPropName"
      :yPropName="yPropName"
    />
    <chart-scatter
      :layout="layout"
      :series-data="bitChangeData"
      :scale="scale"
      :color="color"
      :xPropName="xPropName"
      :yPropName="yPropName"
    />
  </g>
</template>

<script>
import ChartLine from './ChartLine';
import ChartScatter from './ChartScatter';

export default {
  name: 'chart-series',
  components: {
    ChartLine,
    ChartScatter,
  },
  props: ['layout', 'series-data', 'scale', 'color', 'xPropName', 'yPropName'],
  computed: {
    bitChangeData() {
      return this.$store.getters.bitChangeData;
    },
  },
};
</script>
