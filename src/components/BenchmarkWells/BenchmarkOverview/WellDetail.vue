<template>
  <div class="well-detail-container">
    <div class="well-detail-title-container" @click="toggleExpand">
      <div class="well-detail-title">Benchmark Wells Details</div>
      <div class="material-icons">{{icon}}</div>
    </div>
    <div v-if="!expanded">
      <div class="well-detail-list">
        <span class="well-detail-list-label">Radius</span>
        <span>{{benchmarkWellsDetails.radius}} miles</span>
      </div>
      <div class="well-detail-list">
        <span class="well-detail-list-label">No. of Wells</span>
        <span>{{benchmarkWellsDetails.includedWells.length}}</span>
      </div>
    </div>
    <div v-else class="well-detail-expanded-container">
      <div
        v-for="(info, index) in infoList"
        :key="index"
        class="well-detail-expanded-section"
      >
        <div class="well-detail-expanded-line">
          <div class="well-detail-expanded-line-title">
            <span :class="[{spacer: info.hideIcon}, 'material-icons']">{{info.icon}}</span>
            <span>{{info.label}}</span>
          </div>
          <span v-if="info.label === 'Spud Date'">
            {{date(benchmarkWellsDetails[info.property])}}
          </span>
          <span v-else-if="info.label === 'No. of Wells'">
            {{benchmarkWellsDetails.includedWells.length}}
          </span>
          <span v-else-if="info.label === 'Radius'">
            {{benchmarkWellsDetails[info.property]}} Miles
          </span>
          <span v-else>{{benchmarkWellsDetails[info.property]}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  name: 'well-detail',
  data() {
    return {
      expanded: true,
      infoList: [
        {
          label: 'Location',
          property: 'location',
          icon: 'place',
          hideIcon: false,
        },
        {
          label: 'Base',
          property: 'county',
          icon: 'check_box_outline_blank',
          hideIcon: true,
        },
        {
          label: 'Country',
          property: 'country',
          icon: 'check_box_outline_blank',
          hideIcon: true,
        },
        {
          label: 'Radius',
          property: 'radius',
          icon: 'check_box_outline_blank',
          hideIcon: true,
        },
        {
          label: 'Spud Date',
          property: 'spudDate',
          icon: 'calendar_today',
          hideIcon: false,
        },
        {
          label: 'No. of Wells',
          property: '',
          icon: 'check_box_outline_blank',
          hideIcon: true,
        },
        {
          label: 'Target Formation',
          property: 'targetFormation',
          icon: 'check_box_outline_blank',
          hideIcon: true,
        },
        {
          label: 'BHA Motor',
          property: 'bhaMotorFilter',
          icon: 'settings',
          hideIcon: false,
        },
        {
          label: 'Section',
          property: 'bitSize',
          icon: 'check_box_outline_blank',
          hideIcon: true,
        },
      ],
    };
  },
  computed: {
    benchmarkWellsDetails() {
      return this.$store.state.well.benchmarkWellsDetails;
    },
    icon() {
      return this.expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down';
    },
  },
  methods: {
    toggleExpand() {
      this.expanded = !this.expanded;
    },
    date(date) {
      return moment(date).format('DD MMM YYYY');
    },
  },
};
</script>

<style lang="sass" scoped>
.well-detail-container
  position: absolute
  top: 6%
  left: 4%
  background: #FDFDFD
  padding: 1em
  width: 350px
  max-height: 350px
  opacity: .8
  z-index: 1
  overflow: auto
.well-detail-title-container
  display: flex
  margin-bottom: 1em
  cursor: pointer
  svg
    margin-right: 5px
  .well-detail-title
    flex: 1
.well-detail-list
  display: flex
  justify-content: space-between
  margin-top: .5em
  font-size: 85%
  .well-detail-list-label
    font-weight: bold
.well-detail-expanded-container
  margin-top: 1em
.well-detail-expanded-section
  margin-top: 0.5em
  font-size: 80%
  .well-detail-expanded-line
    display: flex
    justify-content: space-between
    .well-detail-expanded-line-title
      display: flex
      align-items: center
      font-weight: bold
      .material-icons
        margin-right: 0.3em
      .spacer
        opacity: 0
</style>
