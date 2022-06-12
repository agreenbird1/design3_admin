<template>
  <Header title="分类管理"></Header>
  <div class="category">
    <el-card>
      <template #header>
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
      </template>
      <el-table :data="curCategoryList" style="width: 100%" border>
        <el-table-column prop="id" label="编号" width="180"> </el-table-column>
        <el-table-column prop="name" label="分类" width="280">
        </el-table-column>
        <el-table-column prop="value" label="类值" width="180">
        </el-table-column>
        <el-table-column
          sortable
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
      <footer>
        <el-pagination
          small
          background
          layout="prev, pager, next"
          :page-size="10"
          :total="categoryList?.length"
          @current-change="changeCurrentPage"
          @prev-click="changePage"
          @next-click="changePage"
        />
      </footer>
    </el-card>
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
import Header from "@/components/Header.vue";
import { reactive, ref } from "vue";
import type { ICategoryEdit, ICategory } from "./types";
import { ElMessage } from "element-plus";
import {
  getCategory,
  deleteCategory,
  updateCategory,
  addCategory,
} from "@/api";

const categoryList = ref<ICategory[]>();
const curCategoryList = ref<ICategory[]>();
const dialogEdit = ref(false);
const isEdit = ref(false);
const curId = ref("");
const dialogDelete = ref(false);

getCategory().then((res) => {
  categoryList.value = res.data;
  curCategoryList.value = categoryList.value?.slice(0, 10);
});

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

const aeCategoryBtn = (isEdit: boolean, categoryDialog: ICategoryEdit) => {
  if (isEdit) {
    updateCategory(categoryDialog).then(() => {
      const c = curCategoryList.value?.find((c) => c.id === categoryDialog.id);
      if (c) {
        c.name = categoryDialog.name;
        c.value = categoryDialog.value;
      }
      ElMessage.success("更新成功");
    });
  } else {
    addCategory(categoryDialog).then((res) => {
      categoryList.value?.push({
        id: res.data,
        total: 0,
        ...categoryDialog,
      });
      ElMessage.success("添加成功");
    });
  }
};

const deleteCategoryBtn = (id: string) => {
  dialogDelete.value = true;
  deleteCategory(id).then(() => {
    const idx = curCategoryList.value?.findIndex((c) => c.id === id);
    curCategoryList.value?.splice(idx as number, 1);
    ElMessage.success("删除成功！");
  });
  dialogDelete.value = false;
};

const changeCurrentPage = (val: number) => {
  const start = (val - 1) * 10;
  curCategoryList.value = categoryList.value?.slice(start, start + 10);
};
const changePage = (val: number) => {
  const start = (val - 1) * 10;
  curCategoryList.value = categoryList.value?.slice(start, start + 10);
};
</script>

<style scoped lang="less">
.category {
  padding-top: 5px;
  footer {
    padding: 20px;
    display: flex;
    flex-direction: row-reverse;
  }
}
</style>
