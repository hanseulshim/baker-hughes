import Vue from 'vue';
import Vuex from 'vuex';
import dataPhantom from '../data/dataPhantom.json';
import dataSlope from '../data/dataSlope.json';
import benchmarkNames from '../data/benchmarkNames';
import colors from '../data/colors.json';

import hover from './modules/hover';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    hover,
  },
  state: {
    benchmarkNames,
    colors,
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
        ).map(benchmark => ({
          ...benchmark,
          time: benchmark.value,
        })) :
        dataPhantom.benchmarkDetailsByFeet.filter(
          benchmark => benchmark.name === 'minDrilledHours' && benchmark.startDepth <= getters.maxDepth,
        ).map(benchmark => ({
          ...benchmark,
          cost: benchmark.value * state.operatingCost,
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
    slopeData: (state, getters) =>
      state.dataSlope.filter(slope => slope.well === state.currentWell.wellName)
        .map(well => ({
          ...well,
          cumulativeDepth: well.cumulativeDepth + getters.wellData[0].startDepth,
        })),
    splitData: (state, getters) => {
      const splitArray = [];
      const indexArray = [];
      getters.drillBits.forEach((bit) => {
        const index = getters.wellData.findIndex(well => well.startDepth >= bit.depthIn);
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
      return splitArray;
    },
    splitSlopeData: (state, getters) => {
      const splitArray = [];
      const indexArray = [];
      getters.drillBits.forEach((bit) => {
        const index = getters.slopeData.findIndex(well => well.cumulativeDepth >= bit.depthIn);
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
    wellData: (state, getters) => {
      let index = 0;
      let checkDepth = getters.drillBits[index].depthIn;
      let addDepth = 0;
      return state.currentWell.benchmarkInputByPortionInfo.map((well) => {
        const value = state.currentCompare === 'time' ?
          well.drilledHours : well.drilledHours * state.operatingCost;
        if (checkDepth && well.startDepth >= checkDepth) {
          addDepth += getters.bitDepths[index];
          index += 1;
          checkDepth = index === getters.drillBits.length ? null : getters.drillBits[index].depthIn;
        }
        return {
          ...well,
          [state.currentCompare]: value + addDepth,
        };
      });
    },
    wellNames: () =>
      dataPhantom.includedWells.map(well => ({
        id: well.id,
        name: well.wellName,
      })),
    xMax: (state, getters) =>
      Math.max(...getters.wellData.map(well => well[state.currentCompare])),
  },
});
