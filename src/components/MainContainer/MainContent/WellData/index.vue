<template>
<div>
  <!-- <info-card /> -->
  <line-chart-container
    :axes="axes"
    :benchmark-data="benchmarkData"
    :benchmark-max="benchmarkMax"
    :bit-change-data="bitChangeData"
    :single-well-data="singleWellData"
    :formations-data="formationsData"
    :layout="layout"
    :well-data="wellData"
    :x-max="xMax"
    :x-prop-name="xPropName"
    :y-max="yMax"
    :y-prop-name="yPropName"
  />
</div>
</template>

<script>
import * as d3 from 'd3';
import { mapState } from 'vuex';
import InfoCard from './InfoCard';
import LineChartContainer from './LineChartContainer';

export default {
  name: 'well-data',
  components: {
    InfoCard,
    LineChartContainer,
  },
  data() {
    return {
      layout: {
        width: 900,
        height: 350,
        marginTop: 45,
        marginRight: 35,
        marginBottom: 50,
        marginLeft: 50,
      },
      axes: ['left', 'bottom'],
      xPropName: 'cumulativeDepth',
      yPropName: 'cumulativeTime',
    };
  },
  computed: {
    ...mapState([
      'benchmarkData',
      'singleWellData',
    ]),
    wellData() {
      let indexArray = [];
      const splitArray = [];
      this.singleWellData.forEach((well, index) => {
        if (well.bitSwapped) {
          splitArray.push(indexArray);
          indexArray = [];
          indexArray.push(well);
        } else if (index === this.singleWellData.length - 1) {
          indexArray.push(well);
          splitArray.push(indexArray);
        } else {
          indexArray.push(well);
        }
      });
      return splitArray;
    },
    bitChangeData() {
      return this.singleWellData.filter(well => well.bitSwapped);
    },
    formationsData() {
      return this.singleWellData.filter((well, index, array) =>
        array.findIndex(v => v.formation === well.formation) === index);
    },
    xMax() {
      return d3.max(this.singleWellData, well => well[this.xPropName]);
    },
    yMax() {
      return d3.max(this.singleWellData, well => well[this.yPropName]);
    },
    benchmarkMax() {
      return d3.max(this.benchmarkData.filter(benchmark => benchmark[this.xPropName] <= this.xMax),
        well => well[this.yPropName]);
    },
  },
};
</script>
