<template>
  <Header title="用户管理"></Header>
  <div class="user">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <el-button
            class="button"
            type="primary"
            plain
            @click="forbidUser(true)"
            >解禁账户</el-button
          >
          <el-button
            class="button"
            type="danger"
            plain
            @click="forbidUser(false)"
            >禁用账户</el-button
          >
        </div>
      </template>
      <el-table
        :data="users"
        style="width: 100%"
        border
        ref="userTableRef"
        @selection-change="selectChange"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column prop="id" label="用户id" width="180" />
        <el-table-column prop="username" label="用户名" width="180" />
        <el-table-column prop="mobile" label="手机号" width="180" />
        <el-table-column label="账号状态" width="180">
          <template #default="scope">
            <span v-if="scope.row.disabled === '1'" style="color: skyblue"
              >正常</span
            >
            <span v-else style="color: rgb(245, 127, 127)">已禁用</span>
          </template>
        </el-table-column>
        <el-table-column prop="createAt" label="注册时间" />
      </el-table>
      <div class="pagination">
        <el-pagination
          small
          background
          layout="prev, pager, next"
          :page-size="5"
          :total="users?.length"
          @current-change="changeCurrentPage"
          @prev-click="changePage"
          @next-click="changePage"
        />
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import Header from "@/components/Header.vue";
import { getUsers, forbidUser as forbidUserSer } from "@/api";
import dayjs from "dayjs";
import type { IUserRes } from "./types";
import { ref } from "vue";
// 解决一个bug，在全局挂载组件时候冲突，样式不生效
import { ElMessage, ElTable as TElTable } from "element-plus";

const users = ref<IUserRes[]>();
const currentUsers = ref<IUserRes[]>();
const selectUsers = ref<IUserRes[]>();
const userTableRef = ref<InstanceType<typeof TElTable>>();
getUsers().then((res) => {
  res.data.forEach((user: IUserRes) => {
    user.createAt = dayjs(user.createAt).format("YYYY-MM-DD HH:mm:ss");
  });
  users.value = res.data;
  currentUsers.value = users.value?.slice(0, 5);
});

// 将值传递，点击时候判断并触发
const selectChange = (users: IUserRes[]) => {
  selectUsers.value = users;
};
const changeCurrentPage = (page: number) => {
  const start = (page - 1) * 5;
  currentUsers.value = users.value?.slice(start, page + 5);
};
const changePage = (page: number) => {
  const start = (page - 1) * 5;
  currentUsers.value = users.value?.slice(start, page + 5);
};
const forbidUser = (isForbidden: boolean) => {
  if (!selectUsers.value?.length) {
    ElMessage.warning("您还未选择任何用户！");
    return;
  }
  selectUsers.value?.forEach((su) => {
    su.disabled = isForbidden ? "1" : "0";
  });
  forbidUserSer(selectUsers.value).then((res) => {
    if (res.status === 200) {
      selectUsers.value?.forEach((su) => {
        const u = currentUsers.value?.find((cu) => cu.id === su.id);
        if (u) u.disabled = isForbidden ? "1" : "0";
      });
      userTableRef.value?.clearSelection();
      selectUsers.value = [];
      ElMessage.success("操作成功！");
    } else {
      ElMessage.error("服务器内部错误！");
    }
  });
};
</script>

<style scoped lang="less">
.user {
  padding: 5px;
  .pagination {
    display: flex;
    flex-direction: row-reverse;
    padding-top: 15px;
  }
}
</style>
