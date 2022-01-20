import { defineStore } from 'pinia';

interface UserState {
  token: string | undefined;
}
export const useUserStore = defineStore({
  id: 'useUserStore',
  state: (): UserState => ({
    token: undefined,
  }),
  getters: {
    getToken(): string {
      return this.token || '';
    },
  },
  actions: {
    setToken(payload: string | undefined) {
      this.token = payload;
    },
  },
});
