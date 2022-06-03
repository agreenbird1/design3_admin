import { defineStore } from "pinia";

export const useAdminStore = defineStore({
  id: "admin",
  state: () => ({
    id: "",
    name: "",
    type: "",
    token: "",
  }),
  getters: {},
  actions: {},
  // 开启持久化
  persist: {
    enabled: true, // 启用
    strategies: [{ key: "admin", storage: localStorage }],
  },
});
