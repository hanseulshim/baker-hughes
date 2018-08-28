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
    bitDepths: (state, getters) => getters.drillBits.map(bit => bit.depthIn / state.tripRate),
    bitDepthSum: (state, getters) => getters.bitDepths.reduce((a, b) => a + b),
    drillBits: state => state.currentWell.drillBits.slice().sort((a, b) => a.depthIn - b.depthIn),
    maxDepth: (state, getters) =>
      Math.max(...getters.wellData.map(well => well.startDepth)),
    maxTime: state =>
      Math.max(...state.currentWell.benchmarkInputByPortionInfo.map(well => well.drilledHours)),
    splitData: (state, getters) => {
      const splitArray = [[]];
      let index = 0;
      let drillBit = getters.drillBits[index];
      let drillSum = getters.bitDepths[index];
      getters.wellData.forEach((well) => {
        if (index) {
          well.drilledHours += drillSum; // eslint-disable-line no-param-reassign
        }
        if (well.startDepth < drillBit.depthIn) {
          splitArray[splitArray.length - 1].push(well);
        } else {
          if (splitArray[splitArray.length - 1].length) {
            splitArray.push([]);
          }
          splitArray[splitArray.length - 1].push(well);
          index += 1;
          if (index < getters.drillBits.length - 1) {
            drillBit = getters.drillBits[index];
            drillSum = getters.bitDepths[index];
          }
        }
      });
      return splitArray;
    },
    wellData: state => (
      state.currentCompare === 'time' ?
        state.currentWell.benchmarkInputByPortionInfo.map(well => ({ ...well })) :
        state.currentWell.benchmarkInputByPortionInfo.map(well => ({
          ...well,
          drilledHours: well.drilledHours * state.operatingCost,
        }))
    ),
    wellNames: () =>
      dataPhantom.includedWells.map(well => ({
        id: well.id,
        name: well.wellName,
      })),
    xMax: (state, getters) =>
      Math.max(...getters.wellData.map(well => well.drilledHours)),
  },
});
