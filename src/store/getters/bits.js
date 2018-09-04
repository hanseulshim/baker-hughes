export default {
  bitDepths: (state, getters) => getters.drillBits.map(bit => bit.depthIn / state.options.tripRate),
  bitDepthSum: (state, getters) => getters.bitDepths.reduce((a, b) => a + b),
  drillBits: state =>
    state.well.currentWell.drillBits.slice().sort((a, b) => a.depthIn - b.depthIn),
};
