
import dataPhantom from '../../data/dataPhantom.json';

export default {
  state: {
    currentBitFilter: {
      id: 'all',
      label: 'Show All Bits',
    },
    currentWell: dataPhantom.includedWells[0],
    selectedWell: { wellName: '' },
    benchmarkName: dataPhantom.name,
  },
  actions: {
    updateCurrentWell(context, payload) {
      const currentWell = context.getters.combinedWells.wellList
        .find(well => well.id === payload.id);
      context.commit('updateCurrentWell', currentWell);
    },
    updateSelectedWell(context, payload) {
      const unselect = context.state.selectedWell.wellName === payload;
      const selectedWell = unselect ? { wellName: '' } :
        context.getters.combinedWells.wellList
          .find(well => well.wellName === payload);
      context.commit('updateSelectedWell', selectedWell);
    },
    updateBitFilter(context, bitFilter) {
      context.commit('updateBitFilter', bitFilter);
    },
  },
  getters: {
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
    wellData: (state, getters, rootState) => {
      let index = 0;
      let checkDepth = getters.drillBits[index].depthIn;
      let addTime = 0;
      let addCost = 0;
      return state.currentWell.benchmarkInputByPortionInfo.map((well) => {
        if (checkDepth && well.startDepth >= checkDepth) {
          addTime += getters.bitDepths[index];
          addCost += (getters.bitDepths[index] * rootState.options.operatingCost) +
            rootState.options.fixedCost;
          index += 1;
          checkDepth = index === getters.drillBits.length ? null : getters.drillBits[index].depthIn;
        }
        return {
          ...well,
          time: well.drilledHours + addTime,
          cost: (well.drilledHours * rootState.options.operatingCost) + addCost,
        };
      });
    },
    combinedWells: (state, getters, rootState) => {
      const depthArray = [];
      const timeArray = [];
      const costArray = [];
      const wellList = dataPhantom.includedWells.map((well, index) => {
        const maxDepth =
          Math.max(...well.benchmarkInputByPortionInfo.map(portion => portion.startDepth));
        const maxTime = Math.round(
          Math.max(...well.benchmarkInputByPortionInfo.map(portion => portion.drilledHours)));
        const maxCost = maxTime * rootState.options.operatingCost;
        const sortedDrillBits = well.drillBits.sort((a, b) => a.depthIn - b.depthIn);
        depthArray.push(maxDepth);
        timeArray.push(maxTime);
        costArray.push(maxCost);
        return {
          maxDepth,
          maxTime,
          maxCost,
          color: rootState.chartInfo.colors.benchmarkName[index],
          drillBits: sortedDrillBits,
          ...well,
        };
      });
      return {
        wellList,
        maxDepth: Math.max(...depthArray),
        minDepth: Math.min(...depthArray),
        maxTime: Math.max(...timeArray),
        maxCost: Math.max(...costArray),
        minCost: Math.min(...costArray),
      };
    },
  },
  mutations: {
    updateCurrentWell(state, payload) {
      state.currentWell = payload;
    },
    updateSelectedWell(state, payload) {
      state.selectedWell = payload;
    },
    updateBitFilter(state, payload) {
      state.currentBitFilter = payload;
    },
  },
};
