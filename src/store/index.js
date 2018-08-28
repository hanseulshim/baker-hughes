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
    currentCompare: 'time',
  },
  mutations: {
    toggleCompare(state, payload) {
      state.currentCompare = payload;
    },
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
    toggleCompare(context, compare) {
      context.commit('toggleCompare', compare);
    },
    updateCurrentWell(context, well) {
      context.commit('updateCurrentWell', well);
    },
    updateWellOptions(context, options) {
      context.commit('updateWellOptions', options);
    },
  },
  getters: {
    wellData: state => (
      state.currentCompare === 'time' ?
        state.currentWell.benchmarkInputByPortionInfo.slice() :
        state.currentWell.benchmarkInputByPortionInfo.map(well => ({
          ...well,
          drilledHours: well.drilledHours * state.operatingCost,
        }))
    ),
    benchmarks: (state, getters) => (
      state.currentCompare === 'time' ?
        dataPhantom.benchmarkDetailsByFeet.filter(
          benchmark => benchmark.name === 'minDrilledHours' && benchmark.startDepth <= getters.maxDepth,
        ) :
        dataPhantom.benchmarkDetailsByFeet.filter(
          benchmark => benchmark.name === 'minDrilledHours' && benchmark.startDepth <= getters.maxDepth,
        ).map(benchmark => ({
          ...benchmark,
          value: benchmark.value * state.operatingCost,
        }))
    ),
    wellNames: () =>
      dataPhantom.includedWells.map(well => ({
        id: well.id,
        name: well.wellName,
      })),
    maxDepth: (state, getters) =>
      Math.max(...getters.wellData.map(well => well.startDepth)),
    xMax: (state, getters) =>
      Math.max(...getters.wellData.map(well => well.drilledHours)),
    maxTime: state =>
      Math.max(...state.currentWell.benchmarkInputByPortionInfo.map(well => well.drilledHours)),
    bitDepths: state => state.currentWell.drillBits.map(bit => bit.depthIn / state.tripRate),
    bitDepthSum: (state, getters) => getters.bitDepths.reduce((a, b) => a + b),
  },
});
