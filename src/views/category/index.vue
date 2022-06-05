<template>
  <div class="category">
    <div class="category-header">
      <el-button
        type="primary"
        plain
        @click="
          isEdit = false;
          openDialog();
        "
      >
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
              isEdit = true;
              openDialog({
                id: scope.row.id,
                name: scope.row.name,
                value: scope.row.value,
              });
            "
            >编辑</el-button
          >
          <el-button
            size="small"
            type="danger"
            @click="
              dialogDelete = true;
              curId = scope.row.id;
            "
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>

  <!-- 编辑框 -->
  <el-dialog v-model="dialogEdit" title="分类管理" width="30%">
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
        <el-button @click="dialogEdit = false">取消</el-button>
        <el-button
          type="primary"
          @click="
            aeCategoryBtn(isEdit, categoryDialog);
            dialogEdit = false;
          "
          >确认</el-button
        >
      </span>
    </template>
  </el-dialog>

  <!-- 删除提示框 -->
  <el-dialog v-model="dialogDelete" title="删除分类" width="30%">
    删除该分类后，该分类下的商品将都被删除！确认删除吗？
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogDelete = false">取消</el-button>
        <el-button type="danger" @click="deleteCategoryBtn(curId)"
          >确认</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import type { ICategoryEdit } from "./types";
import {
  tableData,
  deleteCategoryBtn,
  dialogDelete,
  aeCategoryBtn,
} from "./category";

const dialogEdit = ref(false);
const isEdit = ref(false);
const curId = ref("");

let categoryDialog = reactive<ICategoryEdit>({
  id: "",
  name: "",
  value: "",
});

const openDialog = (editCategory?: ICategoryEdit) => {
  dialogEdit.value = true;
  if (isEdit.value && editCategory) {
    // 不能直接赋值，否则破坏响应式
    categoryDialog.name = editCategory.name;
    categoryDialog.id = editCategory.id;
    categoryDialog.value = editCategory.value;
  } else {
    categoryDialog.name = "";
    categoryDialog.value = "";
  }
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
