import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'

// polyfills
import '@/util/assign-polyfill';

Vue.config.productionTip = false

new Vue({
  created () {
    store.commit('loadData');

    window.addEventListener('unload', () => {
      store.commit('saveData');
    });
  },
  router,
  store,
  render: h => h(App)
}).$mount('#app')
