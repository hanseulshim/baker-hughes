<template>
  <g>
    <line-chart-line
      :color="color"
      :layout="layout"
      :line-data="lineData"
      :scale="scale"
      :x-max="xMax"
      :x-prop-name="xPropName"
      :y-prop-name="yPropName"
    />
  </g>
</template>

<script>
import LineChartLine from './LineChartLine';

export default {
  name: 'line-chart-series',
  components: {
    LineChartLine,
  },
  props: {
    color: {
      type: String,
      required: true,
    },
    layout: {
      type: Object,
      required: true,
    },
    lineData: {
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
    xMax: {
      type: Number,
      required: true,
    },
    yPropName: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      style: {
        display: 'none',
      },
    };
  },
};
</script>
