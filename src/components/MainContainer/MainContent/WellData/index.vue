<template>
<div>
  <div>
    <well-title
      :current-view="currentView"
      @changeView="changeView"
    />
    <benchmark-title />
    <info-card
      :bit-cost="bitCost"
      :bit-change-time-loss="bitChangeTimeLoss"
      :rig-operating-cost="rigOperatingCost"
      @updateWellOptions="updateWellOptions"
    />
    <v-card>
      <line-chart-container
        :axes="axes"
        :benchmark-data="benchmarkData"
        :benchmark-max="benchmarkMax"
        :bit-change-data="bitChangeData"
        :single-well-data="singleWellData"
        :well-data="wellData"
        :x-max="xMax"
        :x-prop-name="xPropName"
        :y-max="yMax"
        :y-prop-name="yPropName"
      />
    </v-card>
  </div>
</div>
</template>

<script>
import * as d3 from 'd3';
import { mapState } from 'vuex';
import InfoCard from './InfoCard';
import LineChartContainer from './LineChartContainer';
import WellTitle from './WellTitle';
import BenchmarkTitle from './BenchmarkTitle';

export default {
  name: 'well-data',
  components: {
    InfoCard,
    LineChartContainer,
    WellTitle,
    BenchmarkTitle,
  },
  data() {
    return {
      axes: ['left', 'bottom'],
      xPropName: 'cumulativeDepth',
      yPropName: 'cumulativeTime',
      currentView: 'Overview',
      bitCost: 15000,
      bitChangeTimeLoss: 0,
      rigOperatingCost: 1000,
    };
  },
  computed: {
    ...mapState([
      'benchmarkData',
      'singleWellData',
      'currentWell',
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
      return this.currentWell.drillBits;
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
  methods: {
    changeView(view) {
      this.currentView = view;
    },
    updateWellOptions(options) {
      this.bitCost = options.bitCost;
      this.bitChangeTimeLoss = options.bitChangeTimeLoss;
      this.rigOperatingCost = options.rigOperatingCost;
    },
  },
};
</script>
