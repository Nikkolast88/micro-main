import { GetterTree } from 'vuex';
import { UserState } from './modules/user';

type State = {
  user: UserState;
};

const getters: GetterTree<State, unknown> = {
  token: (state) => state.user.token,
};

export default getters;
