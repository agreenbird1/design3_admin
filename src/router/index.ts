import { createRouter, createWebHistory } from "vue-router";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "layout",
      component: () => import("@/views/Layout.vue"),
      children: [
        {
          path: "/",
          name: "home",
          component: () => import("@/views/home/index.vue"),
        },
        {
          path: "/category",
          name: "category",
          component: () => import("@/views/category/index.vue"),
        },
        {
          path: "/user",
          name: "user",
          component: () => import("@/views/user/index.vue"),
        },
        {
          path: "/goods",
          name: "goods",
          component: () => import("@/views/goods/index.vue"),
        },
        {
          path: "/order",
          name: "order",
          component: () => import("@/views/order/index.vue"),
        },
      ],
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/login/index.vue"),
    },
  ],
});

export default router;
