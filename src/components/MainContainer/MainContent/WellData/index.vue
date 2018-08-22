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
      <line-chart-container />
    </v-card>
  </div>
</div>
</template>

<script>
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
      currentView: 'Overview',
      bitCost: 15000,
      bitChangeTimeLoss: 0,
      rigOperatingCost: 1000,
    };
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
