<template>
  <v-card class="card-container">
    <v-card-text class="content-container">
      <div class="info-section">
        <span>Rig Operating Cost</span>
        <div class="input-container">
          <v-text-field
            class="unit-input-field"
            prefix="$"
            v-model.number="operatingCostLocal"
            type="number"
          />
          <span>/ hr</span>
        </div>
      </div>
      <div class="info-section">
        <span>Fixed Cost to Trip</span>
        <div class="input-container">
          <v-text-field
            class="unit-input-field"
            prefix="$"
            v-model.number="fixedCostLocal"
            type="number"
          />
          <span>/ unit</span>
        </div>
      </div>
      <div class="info-section">
        <span>Trip Rate</span>
        <div class="input-container">
          <v-text-field
            class="unit-input-field"
            v-model.number="tripRateLocal"
            type="number"
          />
          <div class="unit-select-container">
            <v-select
              class="unit-select"
              :items="items"
              v-model="tripRateUnitLocal"
            />
            <span>/ hr</span>
          </div>
        </div>
      </div>
      <v-btn class="button-primary" @click="updateWellOptions()">update</v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'well-options',
  props: {
    operatingCost: {
      type: Number,
      required: true,
    },
    fixedCost: {
      type: Number,
      required: true,
    },
    tripRate: {
      type: Number,
      required: true,
    },
    tripRateUnit: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      operatingCostLocal: this.operatingCost,
      fixedCostLocal: this.fixedCost,
      tripRateLocal: this.tripRate,
      tripRateUnitLocal: this.tripRateUnit,
      items: ['ft', 'm'],
    };
  },
  methods: {
    updateWellOptions() {
      const options = {
        operatingCost: this.operatingCostLocal,
        fixedCost: this.fixedCostLocal,
        tripRate: this.tripRateLocal,
        tripRateUnit: this.tripRateUnitLocal,
      };
      this.$emit('updateWellOptions', options);
    },
  },
};
</script>

<style lang="sass">
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
.unit-input-field
  margin-right: 1em
  input
    color: #D0021B !important
.unit-select-container
  display: flex
  align-items: center
.unit-select
  width: 2em
  margin-right: 1em
  .v-select__selection
    color: #007AFF
  .v-input__slot:before,
  .v-input__slot:after
    display: none
</style>
