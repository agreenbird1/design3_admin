import request from "@/utils/request";

export const getAllOrder = () => {
  return request("/order/all", "get");
};

export const deleteOrderSer = (order_id: number) => {
  return request("/order", "delete", { order_id });
};
