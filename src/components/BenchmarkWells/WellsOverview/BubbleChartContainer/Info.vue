<template>
  <div class="info-menu-container">
    <span class="info-menu-title">Time (hrs.)</span>
    <v-menu offset-y middle>
      <i class="material-icons" slot="activator">info_outline</i>
      <v-card class="info-card">
        <v-card-text>
          <div class="info-title">
            <i class="material-icons info-icon">info_outline</i>
            Time (hrs.) vs. Depth
          </div>
          <div class="info-text">{{info1}}</div>
          <div class="info-text">{{info2}}</div>
        </v-card-text>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
export default {
  name: 'bubble-chart-info',
  data() {
    return {
      info1: 'This chart reveals the efficiency of given wells within this benchmark across three measures. It shows the total time the well took (x-axis) and the total depth achieved (y-axis). The size of the bubble represents the estimated cost in $USD for the well.',
      info2: 'If you click a well, additional data is revealed for that well including the above three metrics, as well as the depth that each bit used was pulled, and what the dull grade measures were. The dull grade measures include InnerRow count, OuterRow count, Dull Characteristics, and Reason Pulled.',
    };
  },
};
</script>

<style lang="sass">
.info-menu-container
  display: flex
.info-menu-title
  margin-right: .3em
  font-weight: bold
.info-card
  max-width: 500px
.info-title
  color: #5B5959
  display: flex
  font-weight: bold
  margin-bottom: .5em
  .info-icon
    margin-right: 2%
.info-text
  color: #5B5959
  font-size: 90%
</style>
