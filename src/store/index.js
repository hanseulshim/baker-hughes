import Vue from 'vue';
import Vuex from 'vuex';
import dataPhantom from '../data/dataPhantom.json';
import dataSlope from '../data/dataSlope.json';
import benchmarkNames from '../data/benchmarkNames';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    benchmarkNames,
    currentCompare: 'time',
    currentWell: dataPhantom.includedWells[0],
    dataSlope,
    fixedCost: 15000,
    operatingCost: 2500,
    tripRate: 1000,
    tripRateUnit: 'ft',
    wells: dataPhantom.includedWells,
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
    maxTime: (state, getters) =>
      Math.max(...getters.wellData.map(well => well.drilledHours)),
    maxSlope: (state, getters) =>
      Math.max(...getters.slopeData.map(well => well.running_average_gradient_diff)),
    slopeData: state => state.dataSlope.filter(slope => slope.well === state.currentWell.wellName),
    splitData: (state, getters) => {
      const splitArray = [];
      const indexArray = [];
      getters.drillBits.forEach((bit) => {
        const index = getters.wellData.findIndex(well => well.startDepth > bit.depthIn);
        if (index) { indexArray.push(index); }
      });
      indexArray.forEach((wellIndex, arrIndex) => {
        if (arrIndex === 0) {
          splitArray.push(getters.wellData.slice(0, wellIndex));
        } else {
          splitArray.push(getters.wellData.slice(indexArray[arrIndex - 1], wellIndex));
        }
        if (arrIndex === indexArray.length - 1) {
          splitArray.push(getters.wellData.slice(wellIndex));
        }
      });
      if (splitArray.length > getters.bitDepths.length) {
        for (let i = 1; i < splitArray.length; i += 1) {
          splitArray[i].forEach((well) => {
            well.drilledHours += getters.bitDepths[i - 1]; // eslint-disable-line no-param-reassign
          });
        }
      } else {
        for (let i = 0; i < splitArray.length; i += 1) {
          splitArray[i].forEach((well) => {
            well.drilledHours += getters.bitDepths[i]; // eslint-disable-line no-param-reassign
          });
        }
      }
      return splitArray;
    },
    splitSlopeData: (state, getters) => {
      const splitArray = [];
      const indexArray = [];
      getters.drillBits.forEach((bit) => {
        const index = getters.slopeData.findIndex(well => well.cumulativeDepth > bit.depthIn);
        if (index) { indexArray.push(index); }
      });
      indexArray.forEach((wellIndex, arrIndex) => {
        if (arrIndex === 0) {
          splitArray.push(getters.slopeData.slice(0, wellIndex));
        } else {
          splitArray.push(getters.slopeData.slice(indexArray[arrIndex - 1], wellIndex));
        }
        if (arrIndex === indexArray.length - 1) {
          splitArray.push(getters.slopeData.slice(wellIndex));
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
