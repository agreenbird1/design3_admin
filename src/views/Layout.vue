<template>
  <div class="layout">
    <el-row :gutter="10">
      <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
        <div class="layout-logo">随心选 后台管理系统</div>
        <el-menu
          active-text-color="#ffd04b"
          background-color="#545c64"
          class="el-menu-vertical-demo"
          :default-active="route.path"
          text-color="#fff"
          unique-opened
          router
        >
          <el-menu-item index="/">
            <el-icon>
              <House />
            </el-icon>
            随心选总览
          </el-menu-item>
          <el-menu-item index="/category">
            <el-icon>
              <Document />
            </el-icon>
            分类管理
          </el-menu-item>

          <el-sub-menu index="5">
            <template #title>
              <el-icon>
                <Goods />
              </el-icon>
              商品管理
            </template>
            <el-menu-item index="/goods"> 商品总览</el-menu-item>

            <el-menu-item index="/addgoods"> 添加商品</el-menu-item>
          </el-sub-menu>
          <el-menu-item index="/order">
            <el-icon>
              <Management />
            </el-icon>
            订单管理
          </el-menu-item>
          <el-menu-item index="/user">
            <el-icon>
              <User />
            </el-icon>
            用户管理
          </el-menu-item>
          <el-menu-item v-if="adminStore.type === '1'" index="/admin">
            <el-icon>
              <Help />
            </el-icon>
            管理员管理
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :xs="20" :sm="20" :md="20" :lg="20" :xl="20">
        <router-view></router-view>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import {
  Document,
  Goods,
  House,
  Management,
  User,
  Help,
} from "@element-plus/icons-vue";
import { useRoute } from "vue-router";
import { useAdminStore } from "@/stores/admin";

const adminStore = useAdminStore();
const route = useRoute();
</script>

<style scoped lang="less">
.layout {
  height: 100%;

  .el-row {
    height: 100%;

    & .el-col:first-child {
      background-color: #545c64;
      a {
        color: #fff;
      }
    }
    .el-menu {
      border-right: unset;
    }
    .layout-logo {
      padding: 20px;
      text-align: center;
      font-size: 20px;
      font-family: "Segoe UI";
    }
  }
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>
