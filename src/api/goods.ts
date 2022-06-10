import request from "@/utils/request";
import type { IGoods } from "@/views/goods/types";

export const addGoods = (newGoods: IGoods) => {
  return request("/product", "post", newGoods);
};

export const getGoods = () => {
  return request("/product", "get");
};

export const changePut = (id: number, put: "1" | "0") => {
  return request("/product", "patch", { id, put });
};

export const deleteGoods = (id: number) => {
  return request("/product", "delete", { id });
};

export const getGoodsByCategory = (category_id: string) => {
  return request("/product/category/" + category_id, "get");
};
