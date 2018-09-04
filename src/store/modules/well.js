import dataPhantom from '../../data/dataPhantom.json';

export default {
  state: {
    currentWell: dataPhantom.includedWells[0],
    wellList: dataPhantom.includedWells,
  },
  actions: {
    updateCurrentWell(context, well) {
      context.commit('updateCurrentWell', well);
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
  },
  mutations: {
    updateCurrentWell(state, payload) {
      state.currentWell = state.wellList.find(well => well.id === payload.id);
    },
  },
};
