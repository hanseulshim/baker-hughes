import Vue from 'vue';
import Vuex from 'vuex';
import dataPhantom from '../data/dataPhantom.json';
import benchmarkNames from '../data/benchmarkNames';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    benchmarkNames,
    currentWell: dataPhantom.includedWells[0],
    wells: dataPhantom.includedWells,
  },
  mutations: {
    updateCurrentWell(state, payload) {
      state.currentWell = state.wells.find(well => well.id === payload.id);
    },
  },
  actions: {
    updateCurrentWell(context, well) {
      context.commit('updateCurrentWell', well);
    },
  },
  getters: {
    benchmarks: (state, getters) => dataPhantom.benchmarkDetailsByFeet.filter(
      benchmark => benchmark.name === 'minDrilledHours' && benchmark.startDepth <= getters.yMax,
    ),
    wellNames: () =>
      dataPhantom.includedWells.map(well => ({
        id: well.id,
        name: well.wellName,
      })),
    yMax: state =>
      Math.max(...state.currentWell.benchmarkInputByPortionInfo.map(well => well.startDepth)),
  },
});
