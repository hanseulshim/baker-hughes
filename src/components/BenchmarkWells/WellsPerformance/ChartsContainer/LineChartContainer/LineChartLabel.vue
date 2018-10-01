<template>
  <g class='labels'>
    <text
      class="chart-label"
      text-anchor="middle"
      transform="rotate(-90)"
      :x="layout.marginRight - (layout.height / 2)"
      :y="-layout.marginBottom"
    >
      Depth (ft.)
    </text>
  </g>
</template>

<script>
export default {
  name: 'line-chart-label',
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
};
</script>
