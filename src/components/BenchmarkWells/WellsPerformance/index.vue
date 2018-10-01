<template>
  <div class="benchmark-wells-section-container">
    <div class="benchmark-wells-section-title">
      Wells Performance
    </div>
    <bit-filter-menu />
    <charts-container />
  </div>
</template>

<script>
import ChartsContainer from './ChartsContainer';
import BitFilterMenu from './BitFilterMenu';

export default {
  name: 'wells-performance',
  components: {
    ChartsContainer,
    BitFilterMenu,
  },
};
</script>
