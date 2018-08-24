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
    operatingCost: 2500,
    fixedCost: 15000,
    tripRate: 1000,
    tripRateUnit: 'ft',
  },
  mutations: {
    updateCurrentWell(state, payload) {
      state.currentWell = state.wells.find(well => well.id === payload.id);
    },
    updateWellOptions(state, payload) {
      state.operatingCost = payload.operatingCost;
      state.fixedCost = payload.fixedCost;
      state.tripRate = payload.tripRate;
      state.tripRateUnit = payload.tripRateUnit;
    },
  },
  actions: {
    updateCurrentWell(context, well) {
      context.commit('updateCurrentWell', well);
    },
    updateWellOptions(context, options) {
      context.commit('updateWellOptions', options);
    },
  },
  getters: {
    benchmarks: (state, getters) => dataPhantom.benchmarkDetailsByFeet.filter(
      benchmark => benchmark.name === 'minDrilledHours' && benchmark.startDepth <= getters.maxDepth,
    ),
    wellNames: () =>
      dataPhantom.includedWells.map(well => ({
        id: well.id,
        name: well.wellName,
      })),
    maxDepth: state =>
      Math.max(...state.currentWell.benchmarkInputByPortionInfo.map(well => well.startDepth)),
    maxTime: state =>
      Math.max(...state.currentWell.benchmarkInputByPortionInfo.map(well => well.drilledHours)),
  },
});
