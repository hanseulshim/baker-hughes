export default {
  namespaced: true,
  state: {
    currentCompare: 'time',
    fixedCost: 15000,
    operatingCost: 2500,
    tripRate: 1000,
    tripRateUnit: 'ft',
  },
  mutations: {
    toggleCompare(state, payload) {
      state.currentCompare = payload;
    },
    updateWellOptions(state, payload) {
      state.operatingCost = payload.operatingCost;
      state.fixedCost = payload.fixedCost;
      state.tripRate = payload.tripRate;
      state.tripRateUnit = payload.tripRateUnit;
    },
  },
  actions: {
    toggleCompare(context, compare) {
      context.commit('toggleCompare', compare);
    },
    updateWellOptions(context, options) {
      context.commit('updateWellOptions', options);
    },
  },
};
