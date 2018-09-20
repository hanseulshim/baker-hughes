<template>
  <div>
    <v-menu offset-y min-width=0>
      <div slot="activator" class="bit-selected-container">
        <span class="bit-selection">{{currentBitFilter}}</span>
        <i class="material-icons dropdown">arrow_drop_down</i>
      </div>
      <v-card>
        <v-card-text class="bit-selected-content-container">
          <v-list>
            <v-list-tile
              v-for="(bitFilter, index) in bitFilters"
              :key="index + bitFilter"
              @click="changeBitFilter(bitFilter)"
              :class="{ 'bit-selected-active': currentBitFilter === bitFilter }"
            >
              <v-list-tile-content>
                {{bitFilter}}
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-card-text>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
export default {
  name: 'bit-filter-menu',
  data() {
    return {
      bitFilters: [
        'Show All Bits',
        'Only Bit 1',
        'Only Bit 2',
        'Only Bit 3',
        'Only Last Bit',
      ],
    };
  },
  computed: {
    currentBitFilter() {
      return this.$store.state.well.currentBitFilter;
    },
  },
  methods: {
    changeBitFilter(bitFilter) {
      this.$store.dispatch('updateBitFilter', bitFilter);
    },
  },
};
</script>

<style lang="sass" scoped>
.bit-selected-container
  display: flex
  align-items: center
.bit-selection
  color: #007AFF
.material-icons
  font-size: 100%
.dropdown
  cursor: pointer
  color: #9B9B9B
.bit-selected-active
  background-color: #F9F9F9
  font-size: 112.5%
  color: #DE4747
.bit-selected-content-container
  display: flex
  padding: 0
</style>
