import request from "@/utils/request";
import type { IUserRes } from "@/views/user/types";

export const getUsers = () => {
  return request("/user", "get");
};

export const forbidUser = (users: IUserRes[]) => {
  return request("/user", "patch", users);
};
