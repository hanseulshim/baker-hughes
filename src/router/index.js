import Vue from 'vue';
import Router from 'vue-router';

import MainContent from '../components/MainContainer/MainContent';
import Dashboard from '../components/MainContainer/MainContent/Dashboard';
import MyFields from '../components/MainContainer/MainContent/MyFields';
import Benchmarks from '../components/MainContainer/MainContent/Benchmarks';
import BenchmarkWells from '../components/MainContainer/MainContent/BenchmarkWells';
import WellData from '../components/MainContainer/MainContent/WellData';
import Actions from '../components/MainContainer/MainContent/Actions';
import Performance from '../components/MainContainer/MainContent/Performance';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: MainContent,
    },
    {
      path: '/dashboard',
      component: Dashboard,
    },
    {
      path: '/myFields',
      component: MyFields,
      children: [
        {
          path: 'benchmarks',
          component: Benchmarks,
        },
        {
          path: 'benchmarkWells',
          component: BenchmarkWells,
        },
        {
          path: 'wellData',
          component: WellData,
        },
      ],
    },
    {
      path: '/actions',
      component: Actions,
    },
    {
      path: '/performance',
      component: Performance,
    },
  ],
});
