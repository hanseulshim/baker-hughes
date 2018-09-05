<template>
  <div class="well-info-subcontainer">
    <div>
      <span class="well-info-title">Total Cost</span>
      <div class="well-info-total-container">
        <i class="material-icons">attach_money</i>
        <span class="well-info-total">{{totalCost}}k</span>
      </div>
    </div>
    <div>
      <div class="well-info-unit-container">
        <span class="well-info-title">Rig</span>
        <span class="well-info-unit">{{rig}}k</span>
      </div>
      <div class="well-info-unit-container">
        <span class="well-info-title">Bit</span>
        <span class="well-info-unit">{{bit}}k</span>
      </div>
      <div class="well-info-unit-container">
        <span class="well-info-title">Loss</span>
        <span class="well-info-unit">{{loss}}k</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
  name: 'cost-info',
  computed: {
    ...mapState('options', [
      'fixedCost',
      'operatingCost',
    ]),
    ...mapGetters([
      'bitDepthSum',
      'maxCost',
      'maxDrilledHours',
    ]),
    bit() {
      return Math.round(
        (this.$store.state.well.currentWell.drillBits.length * this.fixedCost) / 1000);
    },
    loss() {
      return Math.round((this.bitDepthSum * this.operatingCost) / 1000);
    },
    rig() {
      return Math.round((this.maxDrilledHours * this.operatingCost) / 1000);
    },
    totalCost() {
      return Math.round(this.maxCost / 1000);
    },
  },
};
</script>
