import request from "@/utils/request";
import type { IAdminLogin } from "./types";

/**
 *
 * @param admin - IAdminLogin
 * @returns token、name、type
 */
export const login = (admin: IAdminLogin) => {
  return request("/admin/login", "post", {
    name: admin.admin,
    password: admin.password,
  });
};

export const getAdmins = () => {
  return request("/admin", "get");
};

export const patchAdmin = (id: number, forbidden: string) => {
  return request("/admin", "patch", {
    id,
    forbidden,
  });
};
