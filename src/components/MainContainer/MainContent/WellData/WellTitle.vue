<template>
  <div class="well-title-container">
    <i class="material-icons">mail</i>
    <span class="well-title">{{currentWell.wellNameNo}}</span>
    <v-menu offset-y left>
      <i class="material-icons dropdown" slot="activator">arrow_drop_down</i>
      <v-card>
        <v-card-text>
          <div>
            <span class="well-title-secondary">{{currentWell.wellNameNo}}</span>
            <v-list>
              <v-list-tile @click.prevent class="well-tile-active">
                <v-list-tile-content>
                  Overview
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile @click.prevent>
                <v-list-tile-content>
                  Well Details
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
export default {
  name: 'well-title',
  computed: {
    currentWell() {
      return this.$store.getters.currentWell;
    },
  }
};
</script>

<style lang="sass" scoped>
.well-title-container
  display: flex
  align-items: center
  font-size: 250%
  color: #9B9B9B
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
</style>
