<template>
<div>
  <info-card />
  <sample-chart />
</div>
</template>

<script>
import InfoCard from './InfoCard';
import SampleChart from './SampleChart';

export default {
  name: 'well-data',
  components: {
    InfoCard,
    SampleChart,
  },
  computed: {
    selectedWell() {
      return this.$store.getters.selectedWell;
    },
  },
};
</script>
