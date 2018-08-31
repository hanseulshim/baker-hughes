<template>
  <g class='formations'>
    <g
      v-for="(formation, index) in formations"
      :key="`${index}-${formation.formationName}`"
    >
      <rect
        :fill="colors.formation[index]"
        :height="getHeight(formation)"
        :width="layout.width"
        :y="getY(formation)"
      />
      <text
        v-if="getHeight(formation) > 10"
        class="chart-formation-label"
        text-anchor="end"
        :x="layout.width - 8"
        :y="getY(formation) + 10"
      >{{formation.formationName}}</text>
    </g>
  </g>
</template>

<script>
export default {
  name: 'line-chart-formation',
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
    colors() {
      return this.$store.state.colors;
    },
    formations() {
      return this.$store.state.currentWell.includedFormations.filter(
        formation => formation.startDepth <= this.$store.getters.maxDepth);
    },
  },
  methods: {
    getHeight(formation) {
      return this.scale.y(formation.endDepth - formation.startDepth);
    },
    getY(formation) {
      return this.scale.y(formation.startDepth);
    },
  },
};
</script>

<style lang="sass" scoped>
.chart-formation-label
  fill: #9A9993
  font-size: 60%
</style>
