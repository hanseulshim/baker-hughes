<template>
  <g>
    <g
      v-for="(formation, index) in formations"
      :key="`${index}-${formation.formationName}`"
    >
      <rect
        :width="getWidth(formation)"
        :height="layout.height"
        :x="getX(formation)"
        :fill="formationColor(index)"
      />
      <text
        v-if="getWidth(formation) > 230"
        :x="-5"
        :y="getX(formation) + 12"
        text-anchor="end"
        transform="rotate(-90)"
        font-size="50%"
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
  },
  data() {
    return {
      formationColor: d3.scaleOrdinal(d3.schemePastel1),
    };
  },
  computed: {
    formations() {
      return this.$store.state.currentWell.includedFormations;
    },
  },
  methods: {
    getWidth(formation) {
      return formation.endDepth - formation.startDepth;
    },
    getX(formation) {
      return this.scale.x(formation.startDepth);
    },
  },
};
</script>
