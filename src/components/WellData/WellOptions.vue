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
      <v-btn class="button-primary" @click="updateWellOptions">update</v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'well-options',
  data() {
    return {
      operatingCostLocal: this.$store.state.options.operatingCost,
      fixedCostLocal: this.$store.state.options.fixedCost,
      tripRateLocal: this.$store.state.options.tripRate,
      tripRateUnitLocal: this.$store.state.options.tripRateUnit,
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
      this.$store.dispatch('options/updateWellOptions', options);
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
  input, .v-text-field__prefix
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
