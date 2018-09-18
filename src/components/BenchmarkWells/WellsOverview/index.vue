<template>
  <div class="benchmark-wells-section-container">
    <div class="benchmark-wells-section-title">
      Wells Overview
    </div>
    <bubble-chart-container />
  </div>
</template>

<script>
import BubbleChartContainer from './BubbleChartContainer';

export default {
  name: 'wells-overview-title',
  components: {
    BubbleChartContainer,
  },
};
</script>
