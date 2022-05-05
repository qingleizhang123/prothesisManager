import Vuex from 'vuex';

export default new Vuex.Store({
  state: {
    currentTab: 'prothesis-list',
  },
  getters: {},
  mutations: {
    updateCurrentPage(state, currentTab) {
      state.currentTab = currentTab;
    },
  },
});
