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
};
</script>

<style lang="sass" scoped>
.well-info-container
  display: flex
  justify-content: space-between
</style>
