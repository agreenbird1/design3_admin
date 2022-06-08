<template>
  <div class="add-goods">
    <div class="add-goods-title">编辑商品</div>
    <el-form
      ref="goodsFormRef"
      :model="goodsForm"
      :rules="rules"
      label-width="120px"
      class="demo-ruleForm"
      status-icon
    >
      <el-form-item label="商品名称" prop="name" style="width: 40%">
        <el-input v-model="goodsForm.name" />
      </el-form-item>
      <el-form-item label="商品简介" prop="description" style="width: 40%">
        <el-input type="textarea" v-model="goodsForm.description" />
      </el-form-item>
      <el-form-item label="商品价格" prop="price" style="width: 40%">
        <el-input v-model="goodsForm.price" />
      </el-form-item>
      <el-form-item label="商品属性" prop="property" style="width: 40%">
        <el-input
          type="textarea"
          placeholder="属性名=属性值&属性值:库存;"
          @blur="changeProperties"
          :rows="4"
          v-model="goodsForm.property"
        />
      </el-form-item>
      <el-form-item label="商品库存" prop="inventory" style="width: 40%">
        <el-input v-model="goodsForm.inventory" />
      </el-form-item>
      <el-form-item label="上架状态" prop="put">
        <el-radio-group v-model="goodsForm.put">
          <el-radio label="1">上架</el-radio>
          <el-radio label="0">下架</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="商品图片" prop="pictures" style="width: 60%">
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
        <el-button type="primary" @click="submitForm(goodsFormRef)"
          >创建商品</el-button
        >
        <el-button @click="resetForm(goodsFormRef)">重置数据</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { deleteAddGoodsPic } from "@/api";
import type {
  UploadProps,
  UploadUserFile,
  FormInstance,
  FormRules,
} from "element-plus";
import { Plus } from "@element-plus/icons-vue";

const goodsForm = reactive({
  name: "",
  price: "",
  msg: "",
  description: "",
  put: "1",
  category: "",
  property: "",
  inventory: 0,
  pictures: "",
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

const rules = reactive<FormRules>({
  name: [{ required: true, message: "商品名称不能为空", trigger: "blur" }],
});

const files = ref<UploadUserFile[]>([]);

const handleRemove: UploadProps["onRemove"] = (uploadFile) => {
  // 随时删除存储
  deleteAddGoodsPic((uploadFile.response as any).filename);
};

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log("submit!");
    } else {
      console.log("error submit!", fields);
    }
  });
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};
</script>

<style scoped lang="less">
.add-goods {
  padding: 20px;
  .add-goods-title {
    width: 100%;
    border-bottom: 1px solid #ddd;
    font-size: 20px;
    font-weight: 600;
    padding-bottom: 20px;
  }
  .el-form {
    padding-top: 20px;
  }
}
</style>
