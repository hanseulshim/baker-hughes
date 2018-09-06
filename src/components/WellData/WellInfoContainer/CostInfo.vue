<template>
  <div class="well-info-subcontainer">
    <div>
      <span class="well-info-title">Total Cost</span>
      <div class="well-info-total-container">
        <i class="material-icons">attach_money</i>
        <span class="well-info-total">{{totalCost}}</span>
      </div>
    </div>
    <div>
      <div class="well-info-unit-container">
        <span class="well-info-title">Rig</span>
        <span class="well-info-unit">{{rig}}</span>
      </div>
      <div class="well-info-unit-container">
        <span class="well-info-title">Bit</span>
        <span class="well-info-unit">{{bit}}</span>
      </div>
      <div class="well-info-unit-container">
        <span class="well-info-title">Loss</span>
        <span class="well-info-unit">{{loss}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import numeral from 'numeral';

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
      return numeral(this.$store.state.well.currentWell.drillBits.length * this.fixedCost)
        .format('0a');
    },
    loss() {
      return numeral((this.bitDepthSum * this.operatingCost))
        .format('0a');
    },
    rig() {
      return numeral((this.maxDrilledHours * this.operatingCost))
        .format('0a');
    },
    totalCost() {
      return numeral(this.maxCost)
        .format('0a');
    },
  },
};
</script>
