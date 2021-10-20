import { ActionTree } from 'vuex';

const state = {
  token: '',
};
export interface UserState {
  token: string;
}
const mutations = {
  setToken(state: UserState, payload: string): void {
    state.token = payload;
  },
};
const actions: ActionTree<UserState, unknown> = {
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
