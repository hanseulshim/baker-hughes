<template>
  <div class="benchmark-title-container">
    <span>Benchmark Comparision Group:</span>
    <v-menu offset-y left min-width=0>
      <div slot="activator" class="benchmark-selected-container">
        <span class="benchmark-title">{{currentBenchmark}}</span>
        <i class="material-icons dropdown">arrow_drop_down</i>
      </div>
      <v-card>
        <v-card-text class="benchmark-title-content-container">
          <div class="benchmark-title-section">
            <span class="benchmark-title-secondary">{{currentWell.wellName}} Benchmark</span>
            <v-list>
              <v-list-tile
                v-for="(benchmarkName, index) in benchmarkNames"
                :key="index + benchmarkName"
                @click="changeBenchmark(benchmarkName)"
                :class="{ 'benchmark-title-active': currentBenchmark === benchmarkName }"
              >
                <v-list-tile-content
                  :class="{ 'no-benchmark-title': benchmarkName === 'No Benchmark' }"
                >
                  {{benchmarkName}}
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <span class='new-benchmark'>Create new benchmark</span>
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
  name: 'benchmark-title',
  computed: {
    benchmarkNames() {
      return this.$store.state.benchmark.benchmarkNames;
    },
    currentWell() {
      return this.$store.state.well.currentWell;
    },
  },
  data() {
    return {
      currentBenchmark: this.$store.state.benchmark.benchmarkNames[0],
    };
  },
  methods: {
    changeBenchmark(benchmark) {
      this.currentBenchmark = benchmark;
    },
  },
};
</script>

<style lang="sass" scoped>
.benchmark-title-container
  color: #9B9B9B
  margin-left: 7%
  display: flex
  align-items: center
.benchmark-selected-container
  display: flex
  align-items: center
  width: 100%
.benchmark-title
  margin-left: 1%
  color: #007AFF
.material-icons
  font-size: 100%
.dropdown
  cursor: pointer
.benchmark-title-secondary
  color: #5B5959
  font-size: 125%
.benchmark-title-active
  background-color: #F9F9F9
  font-size: 112.5%
  color: #DE4747
.benchmark-title-content-container
  display: flex
.benchmark-title-section
  margin: 0 1em
.v-menu--inline
  display: block
  flex-grow: 1
.no-benchmark-title
  font-weight: bold
.new-benchmark
  margin-top: 1em
  color: #007AFF
  cursor: pointer
</style>
