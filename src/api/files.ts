import request from "@/utils/request";
import type { IGoodsPic } from "@/views/goods/types";

// 添加商品时候需要删除不想要的图片
export const deleteAddGoodsPic = (name: string) => {
  return request("/upload/product", "delete", { name });
};

export const addGoodsPic = (pics: IGoodsPic[], id: number) => {
  return request("/upload/picture", "post", {
    id,
    pictures: pics,
  });
};
