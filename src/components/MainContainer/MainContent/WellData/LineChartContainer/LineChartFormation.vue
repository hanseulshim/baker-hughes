<template>
  <g class='formations'>
    <g
      v-for="(formation, index) in formations"
      :key="`${index}-${formation.formationName}`"
    >
      <rect
        :width="layout.width"
        :height="getHeight(formation)"
        :y="getY(formation)"
        :fill="formationColor(index)"
      />
      <text
        class="chart-formation-label"
        :x="layout.width - 10"
        :y="getY(formation) + 12"
        text-anchor="end"
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
  font-size: 50%
</style>
