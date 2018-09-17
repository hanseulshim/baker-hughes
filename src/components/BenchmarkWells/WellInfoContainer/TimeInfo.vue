<template>
  <div class="well-info-subcontainer">
    <div>
      <span class="well-info-title">Time</span>
      <div class="well-info-total-container">
        <i class="material-icons">access_time</i>
        <span class="well-info-total">{{totalTime}} hrs</span>
      </div>
    </div>
    <div>
      <div class="well-info-unit-container">
        <span class="well-info-title">Operating</span>
        <span class="well-info-unit">{{operating}}</span>
      </div>
      <div class="well-info-unit-container">
        <span class="well-info-title">Bit Change</span>
        <span class="well-info-unit">{{bitChange}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'time-info',
  computed: {
    ...mapGetters(['maxTime', 'bitDepthSum']),
    bitChange() {
      return Math.round(this.bitDepthSum);
    },
    operating() {
      return this.totalTime - this.bitChange;
    },
    totalTime() {
      return Math.round(this.maxTime);
    },
  },
};
</script>

<style lang="sass">
.well-info-subcontainer
  width: 50%
  padding: 1em
  background-color: #F9F9F9
  margin: 1em
  display: flex
  justify-content: space-between
  .well-info-title
    font-weight: bold
    text-align: right
  .well-info-unit
    margin-left: 2em
    font-weight: 300
  .well-info-unit-container
    display: flex
    justify-content: space-between
  .well-info-total-container
    display: flex
    align-items: center
    .material-icons
      font-size: 250%
      font-weight: 300
    .well-info-total
      font-size: 250%
      font-weight: 300
</style>
