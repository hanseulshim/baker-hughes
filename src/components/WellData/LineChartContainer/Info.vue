<template>
  <div>
    <v-menu id="line-info-menu" offset-y middle>
      <i class="material-icons" slot="activator">info_outline</i>
      <v-card class="info-card">
        <v-card-text>
          <div class="info-title">
            <i class="material-icons info-icon">info_outline</i>
            <div>
              <span class="info-compare">{{currentCompare}}</span>
              vs. Depth
            </div>
          </div>
          <div class="info-text">{{info}}</div>
        </v-card-text>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
export default {
  name: 'line-chart-info',
  data() {
    return {
      time: 'This chart is plotted every 20 ft using bit sensor data. It shows the time (x-axis) the selected well took to reach each depth (y-axis.) Bit pull time was added to the bit data in the chart based on user input, “Trip Rate.” The grey “Benchmark Well” line combines the best 20 ft increment among all wells in the benchmark group into one line for comparison.',
      cost: 'This chart is plotted every 20 ft using bit sensor data. It shows the cost (x-axis) the selected well took to reach each depth (y-axis.) Cost was calculated by multiplying the user input, “Rig Operating Cost” with the cumulative time. For each bit pull, additional cost was added in the chart based on, “Trip Rate” and “Fixed Cost to Trip.” The grey “Benchmark Well” line combines the best 20 ft increment among all wells in the benchmark group into one line for comparison.',
    };
  },
  computed: {
    currentCompare() {
      return this.$store.state.options.currentCompare;
    },
    info() {
      return this.currentCompare === 'time' ? this.time : this.cost;
    },
  },
};
</script>

<style lang="sass">
#line-info-menu
  position: absolute
  top: -0.5%
  left: 60%
.info-card
  max-width: 500px
.info-title
  color: #5B5959
  display: flex
  font-weight: bold
  margin-bottom: .5em
  .info-icon
    margin-right: 2%
  .info-compare
    text-transform: capitalize
.info-text
  color: #5B5959
  font-size: 90%
</style>
