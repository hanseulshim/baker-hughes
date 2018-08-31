export default {
  namespaced: true,
  state: {
    bbox: { width: 0, height: 0 },
    dataBenchmark: { value: 0, startDepth: 0 },
    dataWell: { drilledHours: 0, startDepth: 0 },
    lineOpacity: 0,
  },
  mutations: {
    updateBbox(state, payload) {
      state.bbox = payload;
    },
    updateDataWell(state, payload) {
      state.dataWell = payload;
    },
    updateDataBenchmark(state, payload) {
      state.dataBenchmark = payload;
    },
    hideVisible(state, payload) {
      state.lineOpacity = payload;
    },
    showVisible(state, payload) {
      state.lineOpacity = payload;
    },
  },
  actions: {
    updateBbox(context, bbox) {
      context.commit('updateBbox', bbox);
    },
    updateDataWell(context, dataWell) {
      context.commit('updateDataWell', dataWell);
    },
    updateDataBenchmark(context, dataBenchmark) {
      context.commit('updateDataBenchmark', dataBenchmark);
    },
    hideVisible(context) {
      context.commit('hideVisible', 0);
    },
    showVisible(context) {
      context.commit('showVisible', 1);
    },
  },
};
