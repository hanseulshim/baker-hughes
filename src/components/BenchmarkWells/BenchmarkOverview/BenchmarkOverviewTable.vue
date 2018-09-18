<template>
  <v-data-table
    :headers="headers"
    :items="benchmarkNamesTable"
    hide-actions
  >
    <template slot="items" slot-scope="props">
      <td class="text-xs-right">
        <svg width="20" height="20">
          <rect width="20" height="20"
            :style="`fill: ${props.item.color}`" />
        </svg>
      </td>
      <td>{{ props.item.name }}</td>
      <td>{{ props.item.depth }} ft</td>
      <td>{{ props.item.time }} hrs</td>
      <td>{{ props.item.efficiency }}</td>
      <td>{{ props.item.cost }}</td>
      <td>
        <v-btn
          class="button-primary button-link"
          :onclick="`location.href='${props.item.link}'`"
        >View</v-btn>
      </td>
    </template>
  </v-data-table>
</template>

<script>
import numeral from 'numeral';

export default {
  name: 'benchmark-overview-table',
  data() {
    return {
      headers: [
        { text: '', value: 'color', sortable: false, class: 'benchmark-overview-table-header' },
        { text: 'Well', value: 'name', class: 'benchmark-overview-table-header' },
        { text: 'Depth', value: 'depth', class: 'benchmark-overview-table-header' },
        { text: 'Time', value: 'time', class: 'benchmark-overview-table-header' },
        { text: 'Efficiency', value: 'efficiency', class: 'benchmark-overview-table-header' },
        { text: 'Cost', value: 'cost', class: 'benchmark-overview-table-header' },
        { text: 'Link', value: 'link', sortable: false, class: 'benchmark-overview-table-header' },
      ],
    };
  },
  computed: {
    benchmarkNamesTable() {
      return this.$store.state.well.wellList.map((well, index) => {
        const depth =
          numeral(Math.max(...well.benchmarkInputByPortionInfo.map(portion => portion.startDepth)))
            .format('0,0');
        const time = Math.round(
          Math.max(...well.benchmarkInputByPortionInfo.map(portion => portion.drilledHours)));
        const cost = numeral(time * this.$store.state.options.operatingCost).format('0a');
        return {
          color: this.colors[index],
          name: well.wellName,
          depth,
          time,
          efficiency: well.efficiencyScore,
          cost,
          link: 'https://www.google.com',
        };
      });
    },
    colors() {
      return this.$store.state.chartInfo.colors.benchmarkName;
    },
  },
};
</script>

<style lang="sass">
table.v-table
  border-top: 1px solid #5B5959
  border-bottom: 1px solid #5B5959
  thead
    tr:first-child
      border-bottom: 1px solid #5B5959 !important
    .v-datatable__progress
      // display: none
    th
      font-weight: bold
</style>
