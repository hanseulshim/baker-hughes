<template>
  <div>
    <v-menu offset-y left min-width=0>
      <div class="well-title-container" slot="activator">
        <i class="material-icons">mail</i>
        <span class="well-title">{{currentWell}}</span>
        <i class="material-icons dropdown">arrow_drop_down</i>
      </div>
      <v-card>
        <v-card-text class="well-title-content-container">
          <div class="well-title-section">
            <span class="well-title-secondary">{{currentWell}}</span>
            <v-list>
              <v-list-tile
                @click="changeView('Overview')"
                :class="{ 'well-tile-active': currentView === 'Overview' }"
              >
                <v-list-tile-content>
                  Overview
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile
                @click="changeView('Well Details')"
                :class="{ 'well-tile-active': currentView === 'Well Details' }"
              >
                <v-list-tile-content>
                  Well Details
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
          </div>
          <div class="well-title-section">
            <span class="well-title-secondary">Other Wells in Field A</span>
            <v-list>
              <v-list-tile
                v-for="(wellName, index) in wellNames"
                :key="index + wellName"
                @click="changeWell(wellName)"
                :class="{ 'well-tile-active': currentWell === wellName }"
              >
                <v-list-tile-content>
                  {{wellName}}
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
          </div>
        </v-card-text>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'well-title',
  props: {
    currentView: {
      type: String,
      required: true,
    },
    currentWell: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapGetters([
      'wellNames',
    ]),
  },
  methods: {
    changeView(view) {
      this.$emit('changeView', view);
    },
    changeWell(well) {
      this.$emit('changeWell', well);
    },
  },
};
</script>

<style lang="sass" scoped>
.well-title-container
  display: flex
  align-items: center
  font-size: 250%
  color: #9B9B9B
  width: 100%
.well-title
  margin: 0 1%
.material-icons
  font-size: 100%
.dropdown
  cursor: pointer
.well-title-secondary
  color: #5B5959
  font-size: 125%
.well-tile-active
  background-color: #F9F9F9
  font-size: 112.5%
  color: #DE4747
.well-title-content-container
  display: flex
.well-title-section
  margin: 0 1em
.v-menu--inline
  display: block
</style>
