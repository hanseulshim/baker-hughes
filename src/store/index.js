import Vue from 'vue';
import Vuex from 'vuex';

import benchmark from './modules/benchmark';
import chartInfo from './modules/chartInfo';
import hover from './modules/hover';
import options from './modules/options';
import well from './modules/well';

import bits from './getters/bits';
import slopeChart from './getters/slopeChart';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    benchmark,
    chartInfo,
    hover,
    options,
    well,
  },
  getters: {
    ...bits,
    ...slopeChart,
  },
});
