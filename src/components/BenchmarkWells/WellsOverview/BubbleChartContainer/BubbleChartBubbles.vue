<template>
  <g class="bubbles">
    <g
      v-for="(well, index) in wellList"
      :key="index"
    >
      <circle
        class="well-bubble"
        :cx="scale.x(well.maxTime)"
        :cy="scale.y(well.maxDepth)"
        :r="scale.r(well.maxCost)"
        :fill="well.color"
      />
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

<style lang="sass">
.well-bubble
  opacity: .7
</style>
