<template>
  <v-card class="card-container">
    <v-card-text class="content-container">
      <div class="info-section">
        <span>Rig Operating Cost</span>
        <div class="input-container">
          <v-text-field
            prefix="$"
            v-model.number="bitCostLocal"
            suffix="/ hr"
            type="number"
          />
        </div>
      </div>
      <div class="info-section">
        <span>Big Cost</span>
        <div class="input-container">
          <v-text-field
            prefix="$"
            v-model.number="bitChangeTimeLossLocal"
            suffix="/ unit"
            type="number"
          />
        </div>
      </div>
      <div class="info-section">
        <span>Bit Change Time Loss</span>
        <div class="input-container">
          <v-text-field
            prefix="$"
            v-model.number="rigOperatingCostLocal"
            suffix="hr / 1000 ft"
            type="number"
          />
        </div>
      </div>
      <v-btn class="button-primary" @click="updateWellOptions()">update</v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'info-card',
  props: {
    bitCost: {
      type: Number,
      required: true,
    },
    bitChangeTimeLoss: {
      type: Number,
      required: true,
    },
    rigOperatingCost: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      bitCostLocal: this.bitCost,
      bitChangeTimeLossLocal: this.bitChangeTimeLoss,
      rigOperatingCostLocal: this.rigOperatingCost,
    };
  },
  methods: {
    updateWellOptions() {
      const options = {
        bitCost: this.bitCostLocal,
        bitChangeTimeLoss: this.bitChangeTimeLossLocal,
        rigOperatingCost: this.rigOperatingCostLocal,
      };
      this.$emit('updateWellOptions', options);
    },
  },
};
</script>

<style lang="sass" scoped>
.card-container
  margin: 1em 0
.content-container
  display: flex
  align-items: center
  justify-content: space-between
  padding: 1em 2em
.info-section
  display: flex
  flex-direction: column
  margin: 0 1em
.input-container
  display: flex
  align-items: center
</style>
