<template>
  <g class="bubbles">
    <g
      v-for="(well, index) in wellList"
      :key="index"
    >
      <circle cx="50" cy="50" r="10" />
    </g>
  </g>
</template>

<script>
export default {
  name: 'bubble-chart-bubbles',
  props: {
    layout: {
      type: Object,
      required: true,
    },
    scale: {
      type: Object,
      required: true,
    },
  },
  computed: {
    wellList() {
      return this.$store.getters.combinedWells.wellList;
    },
  },
};
</script>
