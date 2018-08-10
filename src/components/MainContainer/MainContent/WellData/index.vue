<template>
<div>
  <info-card />
  <chart-container
    :axes="axes"
    :layout="layout"
    :chart-data="singleWell"
  />
</div>
</template>

<script>
import InfoCard from './InfoCard';
import ChartContainer from '../../../ChartContainer';

export default {
  name: 'well-data',
  components: {
    InfoCard,
    ChartContainer,
  },
  data() {
    return {
      layout: {
        width: 800,
        height: 250,
        marginTop: 45,
        marginRight: 35,
        marginBottom: 50,
        marginLeft: 50,
      },
      axes: ['left', 'bottom'],
    };
  },
  computed: {
    singleWell() {
      return this.$store.state.singleWell;
    },
  },
};
</script>
