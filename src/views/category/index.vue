<template>
  <div class="category">
    <div class="category-header">
      <el-button type="primary" plain @click="openDialog(false)">
        添加分类
      </el-button>
    </div>
    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column prop="id" label="编号" width="180"> </el-table-column>
      <el-table-column prop="name" label="分类" width="180"> </el-table-column>
      <el-table-column prop="value" label="类值" width="180"> </el-table-column>
      <el-table-column
        prop="total"
        label="商品总数"
        width="180"
      ></el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button
            size="small"
            @click="
              openDialog(true, { name: scope.row.name, value: scope.row.value })
            "
            >编辑</el-button
          >
          <el-button
            size="small"
            type="danger"
            @click="deleteCategory(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>

  <el-dialog v-model="dialogVisible" title="添加分类" width="30%">
    <el-form
      label-position="right"
      label-width="70px"
      :model="categoryDialog"
      style="max-width: 460px"
    >
      <el-form-item label="分类">
        <el-input v-model="categoryDialog.name" />
      </el-form-item>
      <el-form-item label="分类值">
        <el-input v-model="categoryDialog.value" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确认</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import type { ICategory, ICategoryEdit } from "./types";

const dialogVisible = ref(false);

const tableData: ICategory[] = [
  {
    name: "手机",
    value: "phone",
    id: "1",
    total: 3,
  },
  {
    name: "电脑",
    value: "computer",
    id: "2",
    total: 10,
  },
];

let categoryDialog = reactive<ICategoryEdit>({
  name: "",
  value: "",
});

const openDialog = (isEdit: boolean, editCategory?: ICategoryEdit) => {
  dialogVisible.value = true;
  if (isEdit && editCategory) {
    // 不能直接赋值，否则破坏响应式
    categoryDialog.name = editCategory.name;
    categoryDialog.value = editCategory.value;
  } else {
    categoryDialog.name = "";
    categoryDialog.value = "";
  }
};

const deleteCategory = (id: string) => {
  console.log(id);
};
</script>

<style scoped lang="less">
.category {
  padding: 100px;
  .category-header {
    display: flex;
    flex-direction: row-reverse;
    padding-bottom: 20px;
  }
}
</style>
