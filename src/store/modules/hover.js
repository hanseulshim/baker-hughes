export default {
  namespaced: true,
  state: {
    bbox: { width: 0, height: 0 },
    bboxSlope: { width: 0, height: 0 },
    dataBenchmark: { value: 0, startDepth: 0 },
    dataSlope: { running_average_gradient_diff: 0, cumulativeDepth: 0 },
    dataWell: { cost: 0, time: 0, startDepth: 0, drilledHours: 0 },
    lineOpacity: 0,
  },
  mutations: {
    hideVisible(state, payload) {
      state.lineOpacity = payload;
    },
    showVisible(state, payload) {
      state.lineOpacity = payload;
    },
    updateHover(state, payload) {
      Object.keys(payload).forEach((key) => {
        state[key] = payload[key] ? payload[key] : state[key];
      });
    },
  },
  actions: {
    hideVisible(context) {
      context.commit('hideVisible', 0);
    },
    showVisible(context) {
      context.commit('showVisible', 1);
    },
    updateHover(context, payload) {
      context.commit('updateHover', payload);
    },
  },
};
