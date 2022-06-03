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
    config.headers && (config.headers["token"] = "Bearer " + admin.token);
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
