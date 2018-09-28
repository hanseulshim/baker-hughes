
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
    bitFilterLines: (state, getters) => getters.combinedWells.wellList.map((well) => {
      const filterLine = [];
      if (state.currentBitFilter.id === 'all') {
        filterLine.push(...well.benchmarkInputByPortionInfo);
      } else if (state.currentBitFilter.id === 'last') {
        const filterDepth = well.drillBits[well.drillBits.length - 1].depthIn;
        filterLine.push(...well.benchmarkInputByPortionInfo
          .filter(depth => depth.startDepth >= filterDepth));
      } else if (state.currentBitFilter.id - 1 >= well.drillBits.length) {
        filterLine.push();
      } else {
        const drillBitIndex = state.currentBitFilter.id - 1;
        const drillBitLastIndex = state.currentBitFilter.id;
        const filterDepth = well.drillBits[drillBitIndex].depthIn;
        const filterDepthLast = well.drillBits.length === state.currentBitFilter.id ?
          Infinity : well.drillBits[drillBitLastIndex].depthIn;
        filterLine.push(...well.benchmarkInputByPortionInfo
          .filter(depth =>
            depth.startDepth >= filterDepth && depth.startDepth <= filterDepthLast,
          ));
      }
      return {
        filterLine,
        wellName: well.wellName,
        color: well.color,
        minDepth: Math.min(...filterLine.map(filterWell => filterWell.startDepth)),
        maxDepth: Math.max(...filterLine.map(filterWell => filterWell.startDepth)),
      };
    }),
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
      const bitArray = [];
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
        bitArray.push(well.drillBits.length);
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
        maxBitLength: Math.max(...bitArray),
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
