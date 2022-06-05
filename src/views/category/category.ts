import type { ICategory, ICategoryEdit } from "./types";
import { ElMessage } from "element-plus";
import {
  getCategory,
  deleteCategory,
  updateCategory,
  addCategory,
} from "@/api";
import { ref } from "vue";

// 分类数据
export const tableData = ref<ICategory[]>();
getCategory().then((res) => {
  tableData.value = res.data;
});

// 删除
export const deleteCategoryBtn = (id: string) => {
  dialogDelete.value = true;
  deleteCategory(id).then(() => {
    const idx = tableData.value?.findIndex((c) => c.id === id);
    tableData.value?.splice(idx as number, 1);
    ElMessage.success("删除成功！");
  });
  dialogDelete.value = false;
};

export const dialogDelete = ref(false);

// 编辑、添加
export const aeCategoryBtn = (
  isEdit: boolean,
  categoryDialog: ICategoryEdit
) => {
  if (isEdit) {
    updateCategory(categoryDialog).then(() => {
      const c = tableData.value?.find((c) => c.id === categoryDialog.id);
      if (c) {
        c.name = categoryDialog.name;
        c.value = categoryDialog.value;
      }
      ElMessage.success("更新成功");
    });
  } else {
    addCategory(categoryDialog).then((res) => {
      tableData.value?.push({
        id: res.data,
        total: 0,
        ...categoryDialog,
      });
      ElMessage.success("添加成功");
    });
  }
};
