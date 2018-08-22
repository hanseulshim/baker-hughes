<template>
  <g class='formations'>
    <g
      v-for="(formation, index) in formations"
      :key="`${index}-${formation.formationName}`"
    >
      <rect
        :fill="formationColor(index)"
        :height="getHeight(formation)"
        :width="layout.width"
        :y="getY(formation)"
      />
      <text
        v-if="getHeight(formation) > 10"
        class="chart-formation-label"
        text-anchor="end"
        :x="layout.width - 8"
        :y="getY(formation) + 8"
      >{{formation.formationName}}</text>
    </g>
  </g>
</template>

<script>
import * as d3 from 'd3';

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
    yMax: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      formationColor: d3.scaleOrdinal(d3.schemePastel1),
    };
  },
  computed: {
    formations() {
      return this.$store.state.currentWell.includedFormations.filter(
        formation => formation.startDepth <= this.yMax);
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
  font-size: 40%
</style>
