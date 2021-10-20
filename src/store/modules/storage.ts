import { ActionTree } from 'vuex';

const state = {
  token: '',
};
interface State {
  token: string;
}
const mutations = {
  setToken(state: State, payload: string): void {
    state.token = payload;
  },
};
const actions: ActionTree<State, unknown> = {
  setToken({ commit }, payload: string): void {
    commit('setToken', payload);
  },
};

export default {
  namespace: true,
  state,
  mutations,
  actions,
};
