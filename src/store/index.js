import Vue from 'vue';
import Vuex from 'vuex';
import data from '../data/data.json';
import dataPhantom from '../data/dataPhantom.json';
import benchmarkData from '../data/benchmarkData.json';
import singleWellData from '../data/singleWellData.json';
import benchmarkList from '../data/benchmarkList';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    data,
    dataPhantom,
    benchmarkData,
    singleWellData,
    benchmarkList,
    user: {
      name: 'Dunder Mifflin',
      avatar: 'dunderMifflin.png',
    },
  },
  getters: {
    wellNames: state =>
      state.dataPhantom.includedWells.map(well => well.wellName).sort(),
    sortedData: (state, getters) =>
      getters.wellNames.map((wellNameNo) => {
        const dataArray = state.data.filter(well => well.wellNameNo === wellNameNo)
          .map(well => ({
            cumulativeCost: well.cumulativeCost,
            cumulativeDepth: well.cumulativeDepth,
            cumulativeTime: well.cumulativeTime,
          }));
        return {
          wellNameNo,
          data: dataArray,
        };
      }),
    currentWell: (state, getters) => getters.sortedData[0],
  },
});
