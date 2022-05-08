import Vuex from 'vuex';
import { ProthesisInfo } from '../utils/interface';

export default new Vuex.Store({
  state: {
    currentTab: 'prothesis-list',
    currentNavLabel: '假体列表',
    shoppingInfo: new Array<ProthesisInfo>(),
    colletInfo: new Array<ProthesisInfo>()
  },
  getters: {},
  mutations: {
    updateCurrentPage(state, currentTab) {
      state.currentTab = currentTab;
    },
    updateCurrentNavLabel(state, currentNavLabel) {
      state.currentNavLabel = currentNavLabel;
    },
    updateShoppingInfo(state, shoppingInfo) {
      state.shoppingInfo = shoppingInfo;
    },
    updateCollecInfo(state, collectInfo) {
      state.colletInfo = collectInfo;
    }
  },
});
