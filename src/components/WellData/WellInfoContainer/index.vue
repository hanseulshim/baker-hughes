<template>
  <div class="well-info-container">
    <time-info />
    <cost-info />
  </div>
</template>

<script>
import CostInfo from './CostInfo';
import TimeInfo from './TimeInfo';

export default {
  name: 'well-info-container',
  components: {
    CostInfo,
    TimeInfo,
  },
  props: {
    operatingCost: {
      type: Number,
      required: true,
    },
    fixedCost: {
      type: Number,
      required: true,
    },
    tripRate: {
      type: Number,
      required: true,
    },
    tripRateUnit: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="sass" scoped>
.well-info-container
  display: flex
  justify-content: space-between
</style>
