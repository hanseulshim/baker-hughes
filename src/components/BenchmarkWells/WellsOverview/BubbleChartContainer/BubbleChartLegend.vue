<template>
  <g class="legend">
    <rect
      :x="layout.width - width"
      :y="layout.height - height"
      :width="width"
      :height="height"
    />
    <text
      :x="layout.width - width + 10"
      :y="layout.height - height + 20"
    >
      * Bubble size represents cost (USD)
    </text>
    <g
      v-for="(circle, index) in circles"
      :key="index"
    >
      <circle
        :cx="layout.width - width + 20 + (index * 40) + circle.r + circle.distance"
        :cy="layout.height - height + 90 - circle.r"
        :r="circle.r"
        fill="#F6F6F6"
        stroke="#C1C1C1"
      />
      <text
        class="legend-label"
        :x="layout.width - width + 28 + (index * 40) + (circle.r * 1.5) + circle.distance"
        :y="layout.height - height + 90"
      >{{circle.cost}}</text>
    </g>
  </g>
</template>

<script>
export default {
  name: 'bubble-chart-legend',
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
      width: 250,
      height: 105,
      circles: [
        {
          r: 10,
          cost: '$100k',
          distance: 0,
        },
        {
          r: 20,
          cost: '$150k',
          distance: 30,
        },
        {
          r: 30,
          cost: '$200k',
          distance: 60,
        },
      ],
    };
  },
};
</script>

<style lang="sass">
.legend
  rect
    fill: #FFF
    stroke: #C1C1C1
  text
    font-size: 90%
  .legend-label
    font-size: 75%
</style>
