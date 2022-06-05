import request from "@/utils/request";
import type { ICategoryEdit } from "@/views/category/types";

export const addCategory = (category: ICategoryEdit) => {
  return request("/category", "post", category);
};

export const deleteCategory = (id: string) => {
  console.log(id);
  return request("/category", "delete", { id });
};

export const updateCategory = (category: ICategoryEdit) => {
  return request("/category", "patch", category);
};

export const getCategory = () => {
  return request("/category", "get");
};
