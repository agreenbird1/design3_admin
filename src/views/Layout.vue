<template>
  <div class="layout">
    <el-row :gutter="10">
      <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
        <div class="layout-logo">随心选 后台管理系统</div>
        <el-menu
          active-text-color="#ffd04b"
          background-color="#545c64"
          class="el-menu-vertical-demo"
          default-active="2"
          text-color="#fff"
        >
          <router-link to="/">
            <el-menu-item index="1">
              <el-icon>
                <House />
              </el-icon>
              随心选总览
            </el-menu-item>
          </router-link>
          <router-link to="/category">
            <el-menu-item index="2">
              <el-icon>
                <Document />
              </el-icon>
              分类管理
            </el-menu-item>
          </router-link>
          <router-link to="/goods"
            ><el-menu-item index="5">
              <el-icon>
                <Goods />
              </el-icon>
              商品管理
            </el-menu-item>
          </router-link>
          <router-link to="/order"
            ><el-menu-item index="4">
              <el-icon>
                <Management />
              </el-icon>
              订单管理
            </el-menu-item>
          </router-link>
          <router-link to="/user"
            ><el-menu-item index="6">
              <el-icon>
                <User />
              </el-icon>
              用户管理
            </el-menu-item>
          </router-link>
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
} from "@element-plus/icons-vue";
import { RouterLink } from "vue-router";
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
