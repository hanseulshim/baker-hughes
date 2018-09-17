<template>
  <v-data-table
    :headers="headers"
    :items="desserts"
    hide-actions
    class="elevation-1"
  >
    <template slot="items" slot-scope="props">
      <td>{{ props.item.name }}</td>
      <td>{{ props.item.calories }}</td>
      <td>{{ props.item.fat }}</td>
      <td>{{ props.item.carbs }}</td>
      <td>{{ props.item.protein }}</td>
      <td>{{ props.item.iron }}</td>
    </template>
  </v-data-table>
</template>

<script>
export default {
  name: 'benchmark-overview-table',
  data() {
    return {
      headers: [
        { text: 'Well', value: 'name' },
        { text: 'Depth', value: 'calories' },
        { text: 'Time', value: 'fat' },
        { text: 'Efficiency', value: 'carbs' },
        { text: 'Cost', value: 'protein' },
        { text: 'Link', value: 'iron', sortable: false },
      ],
      desserts: [
        {
          value: false,
          name: 'Frozen Yogurt',
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: '1%'
        },
        {
          value: false,
          name: 'Ice cream sandwich',
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          iron: '1%'
        },
        {
          value: false,
          name: 'Eclair',
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          iron: '7%'
        },
        {
          value: false,
          name: 'Cupcake',
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          iron: '8%'
        },
        {
          value: false,
          name: 'Gingerbread',
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          iron: '16%'
        },
        {
          value: false,
          name: 'Jelly bean',
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          iron: '0%'
        },
        {
          value: false,
          name: 'Lollipop',
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          iron: '2%'
        },
        {
          value: false,
          name: 'Honeycomb',
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          iron: '45%'
        },
        {
          value: false,
          name: 'Donut',
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          iron: '22%'
        },
        {
          value: false,
          name: 'KitKat',
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          iron: '6%'
        }
      ]
    }
  },
  computed: {
    benchmarkNamesTable() {
      return this.$store.state.well.wellList.map((well, index) => ({
        color: this.colors[index],
        name: well.wellName,
        depth: 9000,
        time: 153,
        effeciency: well.efficiencyScore,
        cost: 200,
        link: 'link',
      }));
    },
    colors() {
      return this.$store.state.chartInfo.colors.benchmarkName;
    },
  },
};
</script>
