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
          <div class="info-text">{{info}}</div>
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
      info: 'This chart is plotted every 20 ft using bit sensor data. It shows the time (x-axis) the selected well took to reach each depth (y-axis.) Bit pull time was added to the bit data in the chart based on user input, “Trip Rate.” The grey “Benchmark Well” line combines the best 20 ft increment among all wells in the benchmark group into one line for comparison.',
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
