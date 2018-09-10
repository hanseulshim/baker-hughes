import colors from '../../data/colors.json';

export default {
  state: {
    colors,
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
  },
};
