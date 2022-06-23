export { login, getAdmins, patchAdmin } from "./admin";
export {
  getCategory,
  addCategory,
  deleteCategory,
  updateCategory,
} from "./category";
export { deleteAddGoodsPic, addGoodsPic } from "./files";
export { getUsers, forbidUser } from "./user";

export {
  addGoods,
  getGoods,
  changePut,
  deleteGoods,
  getGoodsByCategory,
} from "./goods";

export * from "./order";
