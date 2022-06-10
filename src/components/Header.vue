<template>
  <header>
    <span class="title">{{ title }}</span>
    <div class="admin">
      <el-dropdown>
        <span class="el-dropdown-link">
          {{ adminStore.name }}
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-item disabled>
            {{ adminStore.type === "1" ? "超级管理员" : "管理员" }}
          </el-dropdown-item>
          <el-dropdown-item @click="logout">退出登陆</el-dropdown-item>
        </template>
      </el-dropdown>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ArrowDown } from "@element-plus/icons-vue";
import { useAdminStore } from "@/stores/admin";
import router from "@/router";

defineProps({
  title: {
    type: String,
    required: true,
  },
});
const adminStore = useAdminStore();

const logout = () => {
  router.push("/login");
  adminStore.$reset();
};
</script>

<style scoped lang="less">
header {
  display: flex;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid #ddd;
  .title {
    font-size: 20px;
    font-weight: 600;
  }
}
</style>
