// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vuetify from 'vuetify';
import * as VueGoogleMaps from 'vue2-google-maps';
import 'vuetify/dist/vuetify.min.css';

import App from './App';
import store from './store';

Vue.config.productionTip = false;
Vue.use(Vuetify);
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyBvXwNIeXrdXN9IvCnLyDZ7ebKXIJdd3Mg',
    libraries: 'places',
  },
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  components: { App },
  template: '<App />',
});
