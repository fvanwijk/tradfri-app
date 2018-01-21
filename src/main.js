import Vue from 'vue';
import App from './App';
import router from './router';

import './assets/semantic.css';
// import './assets/semantic';

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App),
});
