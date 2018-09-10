import * as d3 from 'd3';
import colors from '../../data/colors.json';

export default {
  state: {
    colors,
    layout: {
      height: 600,
      marginTop: 45,
      marginBottom: 50,
    },
  },
  getters: {
    maxCost: (state, getters) =>
      Math.max(...getters.wellData.map(well => well.cost)),
    maxDepth: (state, getters) =>
      Math.max(...getters.wellData.map(well => well.startDepth)),
    maxDrilledHours: (state, getters) =>
      Math.max(...getters.wellData.map(well => well.drilledHours)),
    maxTime: (state, getters) =>
      Math.max(...getters.wellData.map(well => well.time)),
    maxSlope: (state, getters) =>
      Math.max(...getters.slopeData.map(well => well.running_average_gradient_diff)),
    xMax: (state, getters, rootState) =>
      Math.max(...getters.wellData.map(well => well[rootState.options.currentCompare])),
    yScale: (state, getters) =>
      d3.scaleLinear()
        .domain([0, getters.maxDepth])
        .range([0, state.height])
        .nice(),
  },
};
