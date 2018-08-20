import Vue from 'vue';
import Vuex from 'vuex';
import data from '../data/data.json';
import benchmarkData from '../data/benchmarkData.json';
import singleWellData from '../data/singleWellData.json';
import benchmarkList from '../data/benchmarkList';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    data,
    benchmarkData,
    singleWellData,
    benchmarkList,
    user: {
      name: 'Dunder Mifflin',
      avatar: 'dunderMifflin.png',
    },
  },
  getters: {
    wellNameList: state =>
      state.data.filter((well, index) =>
        state.data.findIndex(wellIndex =>
          wellIndex.wellNameNo === well.wellNameNo,
        ) === index,
      ).map(well => well.wellNameNo),
    sortedData: (state, getters) =>
      getters.wellNameList.map((wellNameNo) => {
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
