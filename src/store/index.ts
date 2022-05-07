import Vuex from 'vuex';

export default new Vuex.Store({
  state: {
    currentTab: 'prothesis-list',
    currentNavLabel: '假体列表'
  },
  getters: {},
  mutations: {
    updateCurrentPage(state, currentTab) {
      state.currentTab = currentTab;
    },
    updateCurrentNavLabel(state, currentNavLabel) {
      state.currentNavLabel = currentNavLabel;
    }
  },
});
