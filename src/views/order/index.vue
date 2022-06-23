<template>
  <Header title="订单管理"></Header>
  <div class="order">
    <el-card>
      <template #header>
        <el-cascader
          :options="[
            { label: '所有订单', value: '2' },
            { label: '已支付', value: '1' },
            { label: '已取消', value: '0' },
          ]"
          placeholder="按支付状态查看"
          v-model="state"
          @change="changeState"
        />
      </template>
      <el-table :data="currentOrders" border style="width: 100%">
        <el-table-column property="id" label="订单编号" width="170" />
        <el-table-column prop="user_id" label="用户编号" width="170" />
        <el-table-column label="订单状态" prop="state" width="170">
          <template #default="scope">
            <el-button
              :type="scope.row.state === '1' ? 'success' : 'warning'"
              link
            >
              {{ scope.row.state === "1" ? "已支付" : "已取消" }}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" prop="createAt" width="320" />
        <el-table-column label="操作" min-width="160">
          <template #default="scope">
            <el-button
              size="small"
              type="danger"
              @click="deleteOrder(scope.row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
        <template #empty> 没有数据哦！ </template>
      </el-table>
      <footer>
        <el-pagination
          small
          background
          layout="prev, pager, next"
          :page-size="5"
          :total="currentOrders?.length"
          @current-change="changeCurrentPage"
          @prev-click="changePage"
          @next-click="changePage"
        />
      </footer>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { getAllOrder, deleteOrderSer } from "@/api";
import { ElMessage } from "element-plus";
import { ref } from "vue";
import type { IOrderRes } from "./types";

const orders = ref<IOrderRes[]>([]);
const currentOrders = ref<IOrderRes[]>([]);
const state = ref("2");
getAllOrder().then((res: any) => {
  orders.value = res.data;
  currentOrders.value = orders.value?.slice(0, 5);
});

const deleteOrder = (id: number) => {
  deleteOrderSer(id).then((res) => {
    if (res.status === 200) {
      orders.value.splice(
        orders.value.findIndex((order) => order.id == id),
        1
      );
      currentOrders.value.splice(
        currentOrders.value.findIndex((order) => order.id == id),
        1
      );
      ElMessage.success("删除成功！");
    } else {
      ElMessage.error("删除失败！");
    }
  });
};
const changeCurrentPage = (val: number) => {
  const start = (val - 1) * 5;
  currentOrders.value = orders.value?.slice(start, start + 5);
};
const changePage = (val: number) => {
  const start = (val - 1) * 5;
  currentOrders.value = orders.value?.slice(start, start + 5);
};
const changeState = (val: string) => {
  console.log(val[0]);
  if (val[0] === "2") {
    currentOrders.value = orders.value?.slice(0, 5);
  } else {
    currentOrders.value = orders.value?.filter(
      (order) => order.state === val[0]
    );
  }
};
</script>

<style scoped lang="less">
.order {
  padding-top: 5px;
  footer {
    padding: 20px;
    display: flex;
    flex-direction: row-reverse;
  }
}
</style>
