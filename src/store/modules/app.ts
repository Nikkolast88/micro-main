import { defineStore } from 'pinia';

export const useAppStore = defineStore({
  id: 'useAppStore',
  state: () => ({
    /**左侧菜单栏 折叠 */
    collapsed: false,
  }),
  getters: {
    /** 获取侧边栏状态 */
    getCollapsed: (state) => {
      return state.collapsed;
    },
  },

  actions: {
    /** 侧边栏触发事件 */
    toggleCollapsed() {
      this.collapsed = !this.collapsed;
    },
  },
});
