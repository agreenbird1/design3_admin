import request from "@/utils/request";
import type { IGoods } from "@/views/goods/types";

export const addGoods = (newGoods: IGoods) => {
  return request("/product", "post", newGoods);
};
