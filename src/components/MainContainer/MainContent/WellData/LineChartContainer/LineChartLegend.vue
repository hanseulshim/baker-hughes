<template>
  <div id="line-chart-legend">
    <div>
      <span class="line-chart-legend-title">Depth:</span>
      <span id="line-chart-legend-depth">0</span>
      <span>ft</span>
    </div>
    <div>
      <span class="line-chart-legend-title">Well Time:</span>
      <span id="line-chart-legend-well-time">0</span>
      <span>hrs</span>
    </div>
    <div>
      <span class="line-chart-legend-title">Benchmark Time:</span>
      <span id="line-chart-legend-benchmark-time">0</span>
      <span>hrs</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'line-chart-legend',
};
</script>

<style lang="sass" scoped>
#line-chart-legend
  position: absolute
  top: 20%
  left: 10%
  width: 20%
  opacity: 0
  padding: 1.5%
  background: #006FFF
  border-radius: 8px
  pointer-events: none
  color: #FFF
  font-size: 90%
.line-chart-legend-title
  font-weight: bold
</style>
