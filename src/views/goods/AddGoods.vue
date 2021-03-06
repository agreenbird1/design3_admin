<template>
  <div class="add-goods">
    <Header title="编辑商品"></Header>
    <el-form
      ref="goodsFormRef"
      :model="goodsForm"
      label-width="120px"
      class="demo-ruleForm"
      status-icon
    >
      <el-form-item label="商品名称" prop="name" style="width: 40%">
        <el-input v-model="goodsForm.name" />
      </el-form-item>
      <el-form-item label="商品简介" style="width: 40%" prop="description">
        <el-input type="textarea" v-model="goodsForm.description" />
      </el-form-item>
      <el-form-item label="商品分类" style="width: 40%" prop="category_id">
        <el-cascader
          :options="categories"
          placeholder="选择分类"
          v-model="goodsForm.category_id"
          @change="changeCategory"
        />
      </el-form-item>
      <el-form-item label="商品价格" style="width: 40%" prop="price">
        <el-input v-model="goodsForm.price" />
      </el-form-item>
      <el-form-item label="商品属性" style="width: 40%" prop="property">
        <el-input
          type="textarea"
          placeholder="属性名=属性值&属性名=属性值:库存;"
          @blur="changeProperties"
          :rows="4"
          v-model="goodsForm.property"
        />
      </el-form-item>
      <el-form-item label="商品库存" style="width: 40%" prop="inventory">
        <el-input v-model="goodsForm.inventory" />
      </el-form-item>
      <el-form-item label="上架状态" prop="put">
        <el-radio-group v-model="goodsForm.put">
          <el-radio label="1">上架</el-radio>
          <el-radio label="0">下架</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="商品图片" style="width: 60%">
        <el-upload
          action="http://localhost:8000/upload/product"
          list-type="picture-card"
          :on-remove="handleRemove"
          :file-list="files"
        >
          <el-icon><Plus /></el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="createGoods">创建商品</el-button>
        <el-button @click="resetForm(goodsFormRef)">重置数据</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import Header from "@/components/Header.vue";
import { deleteAddGoodsPic, getCategory, addGoods, addGoodsPic } from "@/api";
import { categoryCascader } from "@/utils/formatCascader";
import type { ICategoryCascader, IGoods, IGoodsPic } from "./types";
import type { UploadProps, UploadUserFile, FormInstance } from "element-plus";
import { ElMessage } from "element-plus";
import { Plus } from "@element-plus/icons-vue";

const goodsForm = reactive<IGoods>({
  name: "",
  price: "",
  description: "",
  put: "1",
  category_id: "",
  property: "",
  inventory: 0,
});

const goodsFormRef = ref<FormInstance>();

const changeProperties = () => {
  goodsForm.property = goodsForm.property.replaceAll("\n", "");
  let p = goodsForm.property.split(";");
  // 每次更改重置库存
  goodsForm.inventory = 0;
  p.forEach((pp) => {
    let i = +pp.split(":")[1];
    if (i) {
      goodsForm.inventory += i;
    }
  });
};

const categories = ref<ICategoryCascader[]>([]);
getCategory().then((res) => {
  categories.value = categoryCascader(res.data);
});

const changeCategory = (value: (string | undefined)[]) => {
  goodsForm.category_id = value[1] as string;
};

const files = ref<UploadUserFile[]>([]);

const handleRemove: UploadProps["onRemove"] = (uploadFile) => {
  // 随时删除存储
  deleteAddGoodsPic((uploadFile.response as any).filename);
};

const createGoods = async () => {
  const res = await addGoods(goodsForm);
  if (res.status === 200) {
    const pics: IGoodsPic[] = files.value.map((file) => {
      return file.response as IGoodsPic;
    });
    await addGoodsPic(pics, res.data);
    resetForm(goodsFormRef.value);
    files.value = [];
    ElMessage.success("添加成功！");
  } else {
    ElMessage.warning("商品名重复！");
  }
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};
</script>

<style scoped lang="less">
.add-goods {
  .el-form {
    padding-top: 20px;
  }
}
</style>
