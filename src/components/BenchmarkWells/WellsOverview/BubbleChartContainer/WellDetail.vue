<template>
  <div
    class="well-detail-container"
    v-if="selectedWell.wellName"
  >
    <div class="well-detail-title-container" @click="toggleExpand">
      <svg width="20" height="20">
        <rect width="20" height="20"
          :style="`fill: ${selectedWell.color}`" />
      </svg>
      <div class="well-detail-title">{{selectedWell.wellName}}</div>
      <div class="material-icons">{{icon}}</div>
    </div>
    <div>
      <div class="well-detail-list">
        <span class="well-detail-list-label">Depth</span>
        <span>{{maxDepth}} ft</span>
      </div>
      <div class="well-detail-list">
        <span class="well-detail-list-label">Total Time</span>
        <span>{{selectedWell.maxTime}} hrs</span>
      </div>
      <div class="well-detail-list">
        <span class="well-detail-list-label">Cost</span>
        <span>{{maxCost}}</span>
      </div>
    </div>
    <div v-if="expanded" class="well-detail-bit-container">
      <div
        v-for="(bit, index) in selectedWell.drillBits"
        :key="index"
        class="well-detail-bit-section"
      >
        <div class="well-detail-bit-line">
          <span class="well-detail-bit-line-title">Bit {{index + 1}}</span>
          <span>{{bit.bitType}}</span>
        </div>
        <div class="well-detail-bit-line">
          <span>Depth out</span>
          <span>{{depthOut(bit.depthOut)}} ft</span>
        </div>
        <div class="well-detail-bit-line">
          <span>Dull grade</span>
          <div class="well-detail-bit-line-dull-grade">
            <span>{{bit.otherDullCharacteristics}}</span>
            <span>{{bit.reasonPulled}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import numeral from 'numeral';

export default {
  name: 'well-detail',
  data() {
    return {
      expanded: false,
    };
  },
  computed: {
    icon() {
      return this.expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down';
    },
    maxCost() {
      return numeral(this.selectedWell.maxCost).format('0a');
    },
    maxDepth() {
      return numeral(this.selectedWell.maxDepth).format('0,0');
    },
    selectedWell() {
      return this.$store.state.well.selectedWell;
    },
  },
  methods: {
    toggleExpand() {
      this.expanded = !this.expanded;
    },
    depthOut(depthOut) {
      return numeral(depthOut).format('0,0');
    },
  },
};
</script>

<style lang="sass" scoped>
.well-detail-container
  position: absolute
  top: 15%
  left: 10%
  background: #F8F8F8
  padding: 1em
  width: 250px
.well-detail-title-container
  display: flex
  font-weight: bold
  margin-bottom: 1em
  cursor: pointer
  svg
    margin-right: 5px
  .well-detail-title
    flex: 1
.well-detail-list
  display: flex
  justify-content: space-between
  margin-top: .5em
  .well-detail-list-label
    font-weight: bold
.well-detail-bit-container
  margin-top: 1em
  border-top: 1px solid #C1C1C1
.well-detail-bit-section
  margin-top: 1em
  .well-detail-bit-line
    display: flex
    justify-content: space-between
    .well-detail-bit-line-title
      font-weight: bold
    .well-detail-bit-line-dull-grade
      color: #D84848
</style>
