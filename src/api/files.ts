import request from "@/utils/request";

// 添加商品时候需要删除不想要的图片
export const deleteAddGoodsPic = (name: string) => {
  return request("/upload/product", "delete", { name });
};
