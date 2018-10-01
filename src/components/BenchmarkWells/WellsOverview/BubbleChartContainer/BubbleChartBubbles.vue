<template>
  <g class="bubbles">
    <g
      v-for="(well, index) in wellList"
      :key="index"
    >
      <circle
        @mouseover="hover(well)"
        @mouseout="removeHover"
        @click="selectWell(well.wellName)"
        :class="[
          {
            'well-bubble-hover': hoverWell === well.wellName,
            'well-bubble-active': selectedWell.wellName === well.wellName,
          }, 'well-bubble-default']"
        :cx="scale.x(well.maxTime)"
        :cy="scale.y(well.maxDepth)"
        :r="scale.r(well.maxCost)"
        :fill="well.color"
      />
      <text
        v-if="hoverWell === well.wellName || selectedWell.wellName === well.wellName"
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
      const wellList = this.$store.getters.combinedWells.wellList
        .filter(well => well.wellName !== this.selectedWell.wellName);
      if (this.selectedWell.wellName) {
        wellList.push(this.selectedWell);
      }
      if (this.hoverWell) {
        const hoverWellObj = wellList.find(well => well.wellName === this.hoverWell);
        const hoverWellList = wellList.filter(well => well.wellName !== hoverWellObj.wellName);
        hoverWellList.push(hoverWellObj);
        return hoverWellList;
      }
      return wellList;
    },
    selectedWell() {
      return this.$store.state.well.selectedWell;
    },
  },
  methods: {
    hover(well) {
      this.hoverWell = well.wellName;
    },
    removeHover() {
      this.hoverWell = '';
    },
    selectWell(wellName) {
      this.$store.dispatch('updateSelectedWell', wellName);
    },
  },
};
</script>

<style lang="sass">
.well-bubble-default
  opacity: .7
.well-bubble-hover, .well-bubble-active
  opacity: 1
.well-bubble-text
  font-size: 80%
  font-weight: bold
</style>
