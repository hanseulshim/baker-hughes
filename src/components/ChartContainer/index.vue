<template>
  <div>
    <d3__chart
      :layout="layout"
      :chart-data="chartData"
      :axes="axes" />
  </div>
</template>

<script>
export default {
  name: '#d3__chart',
  props: [
    'axes',
    'layout',
    'chart-data',
  ],
  computed: {
    // SVG viewbox
    viewBox() {
      const outerWidth = this.layout.width + this.layout.marginLeft + this.layout.marginRight;
      const outerHeight = this.layout.height + this.layout.marginTop + this.layout.marginBottom;
      return '0 0 ' + outerWidth + ' ' + outerHeight;
    },

  //   // Stage
  //   stageStyle: function() {
  //     return {
  //       'transform': 'translate(' + this.layout.marginLeft + 'px,' + this.layout.marginTop + 'px)'
  //     }
  //   }
  // },
  // data: function() {
  //   return {
  //     scale: {
  //       x: this.getScaleX(),
  //       y: this.getScaleY(),
  //       color: d3.scaleOrdinal()
  //         .range(['#159078', '#999999'])
  //         .domain(['Current', 'Previous'])
  //     }
  //   }
  // },
  // methods: {

  //   // Get x-axis scale
  //   getScaleX: function() {
  //     return d3.scaleTime()
  //       .range([0, this.layout.width])
  //       .domain(d3.extent(chartData, function(d) {
  //         return d3.utcParse("%Y-%m-%dT%H:%M:%S")(d[0]).setHours(0,0,0,0)
  //       }));
  //   },

  //   // Get y-axis scale
  //   getScaleY: function() {
  //     return d3.scaleLinear()
  //       .range([this.layout.height, 0])
  //       .domain([
  //         0,
  //         d3.max(this.chartData, function(d) {
  //           return d3.max(d.values, function(e) {
  //             return e.value;
  //           })
  //         })
  //       ]);
  //   }
  // },
  // watch: {
  //   // Watch for layout changes
  //   layout: {
  //     deep: true,
  //     handler() {
  //       this.scale.x = this.getScaleX();
  //       this.scale.y = this.getScaleY();
  //     },
  //   },
  },
};
</script>

<style>

</style>
