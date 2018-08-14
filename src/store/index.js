import Vue from 'vue';
import Vuex from 'vuex';
import data from '../data/data.json';
import benchmark from '../data/benchmark.json';
import singleWell from '../data/singleWell.json';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    data,
    benchmark,
    singleWell,
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
    wellDataTotalTime: state => [state.singleWell, state.benchmark],
    bitChangeData: state => ({
      well: state.singleWell.well,
      data: state.singleWell.data.filter((well, index, array) =>
        array[index - 1] && well.bitcounter !== array[index - 1].bitcounter),
    }),
  },
});
