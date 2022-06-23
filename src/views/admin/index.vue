<template>
  <Header title="管理员管理"></Header>
  <div class="admin">
    <el-card>
      <el-table :data="currentAdmins" border style="width: 100%">
        <el-table-column label="管理员编号" prop="id" width="170" />
        <el-table-column label="管理员名" prop="name" width="170" />
        <el-table-column label="密码" prop="password" width="170">
          <template #default="scope">
            {{ scope.row.type === "1" ? "无权查看" : scope.row.password }}
          </template>
        </el-table-column>
        <el-table-column label="类型" prop="type" min-width="160">
          <template #default="scope">
            {{ scope.row.type === "1" ? "超级管理员" : "管理员" }}
          </template>
        </el-table-column>
        <el-table-column label="状态" prop="forbidden" width="170">
          <template #default="scope">
            <el-button
              :type="scope.row.forbidden === '0' ? 'success' : 'danger'"
              plain
              @click="forbidd(scope.row)"
            >
              {{ scope.row.forbidden === "0" ? "正常" : "禁用" }}
            </el-button>
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
          :total="admins?.length"
          @current-change="changeCurrentPage"
          @prev-click="changePage"
          @next-click="changePage"
        />
      </footer>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { getAdmins, patchAdmin } from "@/api";
import type { IAdminRes } from "./types";
import { ElMessage } from "element-plus";

const admins = ref<IAdminRes[]>([]);
const currentAdmins = ref<IAdminRes[]>([]);

getAdmins().then((res) => {
  admins.value = res.data;
  currentAdmins.value = admins.value.slice(0, 5);
});

const changePage = (val: number) => {
  const start = (val - 1) * 5;
  currentAdmins.value = admins.value?.slice(start, start + 5);
};
const changeCurrentPage = (val: number) => {
  const start = (val - 1) * 5;
  currentAdmins.value = admins.value?.slice(start, start + 5);
};
const forbidd = (admin: IAdminRes) => {
  if (admin.type === "1") {
    ElMessage.warning("您没有权限更改超级管理员的状态！");
  } else {
    patchAdmin(admin.id, admin.forbidden).then((res) => {
      if (res.status === 200) {
        currentAdmins.value.find((admin) => (admin.forbidden = "1"));
        admins.value.find((admin) => (admin.forbidden = "1"));
      }
    });
  }
};
</script>

<style scoped lang="less">
.admin {
  padding: 5px;
  footer {
    padding: 20px;
    display: flex;
    flex-direction: row-reverse;
  }
}
</style>
