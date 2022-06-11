<template>
  <Header title="商品总览"></Header>
  <div class="goods">
    <div class="goods-title">
      <el-button type="primary" plain @click="router.push(`/addgoods`)">
        添加商品
      </el-button>
      &nbsp;
      <el-cascader
        :options="categories"
        placeholder="按分类查看"
        v-model="category_id"
        @change="changeCategory"
      />
    </div>
    <el-table
      :data="currentGoodsList"
      @selection-change="handleSelectionChange"
      border
      style="width: 100%"
    >
      <el-table-column property="id" label="商品编号" width="100" />
      <el-table-column property="name" label="商品名称" width="120" />
      <el-table-column property="description" label="商品简介" width="240" />
      <el-table-column label="商品图片" width="140">
        <template #default="scope">
          <el-image
            :previewSrcList="scope.row.pics"
            :preview-teleported="true"
            style="width: 100px; height: 100px"
            :src="scope.row.pics[0]"
            fit="fill"
          />
        </template>
      </el-table-column>
      <el-table-column property="price" label="商品价格" sortable width="80" />
      <el-table-column
        property="inventory"
        label="商品库存"
        sortable
        width="120"
      />
      <el-table-column label="上架状态" width="120">
        <template #default="scope">
          <span v-if="scope.row.put === '1'" style="color: skyblue">
            销售中
          </span>
          <span v-else style="color: rgb(245, 127, 127)"> 已下架 </span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button size="small" @click="pullGoods(scope.row)">
            {{ scope.row.put === "1" ? "下架" : "上架" }}
          </el-button>
          <el-button
            size="small"
            type="danger"
            @click="deleteGoods(scope.row.id)"
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
        :total="goodsList.length"
        @current-change="changeCurrentPage"
        @prev-click="changePage"
        @next-click="changePage"
      />
    </footer>
  </div>
</template>

<script setup lang="ts">
import Header from "@/components/Header.vue";
import {
  getGoods,
  changePut,
  deleteGoods as deleteGoodsSer,
  getCategory,
  getGoodsByCategory,
} from "@/api";
import { categoryCascader } from "@/utils/formatCascader";
import type { IGoodsRes } from "./types";
import type { ICategoryCascader } from "./types";
import { ElMessage } from "element-plus";
import router from "@/router";
import { ref } from "vue";

const goodsList = ref<IGoodsRes[]>([]);
const currentGoodsList = ref<IGoodsRes[]>([]);
const category_id = ref("");
const categories = ref<ICategoryCascader[]>([]);
getCategory().then((res) => {
  categories.value = categoryCascader(res.data);
});

getGoods().then((res) => {
  goodsList.value = res.data;
  currentGoodsList.value = goodsList.value.slice(0, 5);
});

const handleSelectionChange = () => {
  console.log("1");
};
const pullGoods = (goods: IGoodsRes) => {
  changePut(goods.id, goods.put).then((res) => {
    if (res.status === 200) {
      goods.put = goods.put === "1" ? "0" : "1";
      ElMessage.success(goods.put === "1" ? "下架成功！" : "上架成功！");
    } else {
      ElMessage.success(goods.put === "1" ? "下架失败！" : "上架失败！");
    }
  });
};
const deleteGoods = (id: number) => {
  deleteGoodsSer(id).then((res) => {
    if (res.status === 200) {
      ElMessage.success("删除成功！");
    } else {
      ElMessage.success("删除失败！");
    }
  });
};
const changeCurrentPage = (val: number) => {
  const start = (val - 1) * 5;
  currentGoodsList.value = goodsList.value.slice(start, start + 5);
};
const changePage = (val: number) => {
  const start = (val - 1) * 5;
  currentGoodsList.value = goodsList.value.slice(start, start + 5);
};
const changeCategory = (val: string) => {
  getGoodsByCategory(val[1]).then((res) => {
    goodsList.value = res.data;
    currentGoodsList.value = goodsList.value.slice(0, 5);
  });
  console.log(val);
};
</script>

<style scoped lang="less">
.goods {
  .goods-title {
    padding: 20px;
    padding-left: 0;
  }
  footer {
    padding: 20px;
    display: flex;
    flex-direction: row-reverse;
  }
}
input {
  user-select: none;
}
</style>
