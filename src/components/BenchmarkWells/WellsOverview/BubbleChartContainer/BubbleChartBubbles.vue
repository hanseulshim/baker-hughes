<template>
  <g class="bubbles">
    <g
      v-for="(well, index) in wellList"
      :key="index"
    >
      <circle
        @mouseover="hover(well)"
        @mouseout="removeHover"
        :class="[{'well-bubble-hover': hoverWell === well.wellName}, 'well-bubble-default']"
        :cx="scale.x(well.maxTime)"
        :cy="scale.y(well.maxDepth)"
        :r="scale.r(well.maxCost)"
        :fill="well.color"
      />
      <text
        v-if="hoverWell === well.wellName"
        class="well-bubble-text"
        :x="scale.x(well.maxTime)"
        :y="scale.y(well.maxDepth) + scale.r(well.maxCost) + 15"
        :fill="well.color"
        text-anchor="middle"
      >
        {{well.wellName}}
      </text>
    </g>
  </g>
</template>

<script>
export default {
  name: 'bubble-chart-bubbles',
  data() {
    return {
      hoverWell: '',
    };
  },
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
  methods: {
    hover(well) {
      this.hoverWell = well.wellName;
    },
    removeHover() {
      this.hoverWell = '';
    },
  },
};
</script>

<style lang="sass">
.well-bubble-default
  opacity: .7
.well-bubble-hover
  opacity: 1
.well-bubble-text
  font-size: 80%
  font-weight: bold
</style>
