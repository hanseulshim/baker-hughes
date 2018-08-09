import Vue from 'vue';
import Router from 'vue-router';

import MainContent from '../components/MainContainer/MainContent';
import Dashboard from '../components/MainContainer/MainContent/Dashboard';
import MyFields from '../components/MainContainer/MainContent/MyFields';
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
