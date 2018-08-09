import Vue from 'vue';
import Vuex from 'vuex';
import data from '../data/data.json';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    data,
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
  },
});

