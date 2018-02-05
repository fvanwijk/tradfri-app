import { format } from 'date-fns';
import Vue from 'vue';
import App from './App';
import router from './router';

import './assets/semantic.css';
// import './assets/semantic';

Vue.config.productionTip = false;

Vue.filter('date', (value, dateFormat = 'DD-MM-YYYY') => format(new Date(value), dateFormat));

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App),
});
