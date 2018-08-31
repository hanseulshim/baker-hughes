export default {
  namespaced: true,
  state: {
    bbox: { width: 0, height: 0 },
    bboxSlope: { width: 0, height: 0 },
    dataBenchmark: { cost: 0, time: 0, startDepth: 0 },
    dataSlope: { running_average_gradient_diff: 0, cumulativeDepth: 0 },
    dataWell: { cost: 0, time: 0, startDepth: 0 },
    lineOpacity: 0,
  },
  mutations: {
    hideVisible(state, payload) {
      state.lineOpacity = payload;
    },
    showVisible(state, payload) {
      state.lineOpacity = payload;
    },
    updateBbox(state, payload) {
      state.bbox = payload;
    },
    updateBboxSlope(state, payload) {
      state.bboxSlope = payload;
    },
    updateDataBenchmark(state, payload) {
      state.dataBenchmark = payload;
    },
    updateDataSlope(state, payload) {
      state.dataSlope = payload;
    },
    updateDataWell(state, payload) {
      state.dataWell = payload;
    },
  },
  actions: {
    hideVisible(context) {
      context.commit('hideVisible', 0);
    },
    showVisible(context) {
      context.commit('showVisible', 1);
    },
    updateBbox(context, bbox) {
      context.commit('updateBbox', bbox);
    },
    updateBboxSlope(context, bbox) {
      context.commit('updateBboxSlope', bbox);
    },
    updateDataBenchmark(context, dataBenchmark) {
      context.commit('updateDataBenchmark', dataBenchmark);
    },
    updateDataSlope(context, dataSlope) {
      context.commit('updateDataSlope', dataSlope);
    },
    updateDataWell(context, dataWell) {
      context.commit('updateDataWell', dataWell);
    },
  },
};
