import type { IAdminStore } from "@/stores/type";
import cache from "@/utils/cache";
import axios from "axios";

const instance = axios.create({
  baseURL: "/api",
  timeout: 5000,
});

instance.interceptors.request.use(
  (config) => {
    const admin = cache.getCache("admin") as IAdminStore;
    // 存取cache时候判断失误的错误
    // 应该同时判断admin，即localStorage中是否存在admin
    // 而不是只判断config.headers
    if (admin && config.headers)
      config.headers["authorization"] = "Bearer " + admin.token;
    return config;
  },
  (errors) => {
    return Promise.reject(errors);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (errors) => {
    // 返回信息，通过status判断
    return errors.response;
  }
);

export default (url: string, method: string, reqData?: unknown) => {
  return instance({
    url,
    method,
    [method.toLowerCase() === "get" ? "params" : "data"]: reqData,
  });
};
