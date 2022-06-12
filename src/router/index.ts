import { createRouter, createWebHistory } from "vue-router";
import { useAdminStore } from "@/stores/admin";

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
          path: "/addgoods",
          name: "addgoods",
          component: () => import("@/views/goods/AddGoods.vue"),
        },
        {
          path: "/order",
          name: "order",
          component: () => import("@/views/order/index.vue"),
        },
      ],
      beforeEnter() {
        const admin = useAdminStore();
        if (admin.token.length) return true;
        else {
          router.push("/login");
          return false;
        }
      },
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/login/index.vue"),
    },
  ],
});

export default router;
