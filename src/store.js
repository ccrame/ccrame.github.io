import Vue from 'vue'
import Vuex from 'vuex'
import * as storage from '@/util/storage';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++;
    },
    decrement (state) {
      state.count--;
    },
    loadData (state) {
      const data = storage.getAllItems();
      Object.assign(state, data);
    },
    saveData (state) {
      storage.saveToLocalStorage(state);
    }
  },
  actions: {

  }
})
