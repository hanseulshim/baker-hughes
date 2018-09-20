<template>
  <div class="benchmark-wells-section-container">
    <div class="benchmark-wells-section-title">
      Wells Performance
    </div>
    <charts-container />
  </div>
</template>

<script>
import ChartsContainer from './ChartsContainer';

export default {
  name: 'wells-performance',
  components: {
    ChartsContainer,
  },
};
</script>
