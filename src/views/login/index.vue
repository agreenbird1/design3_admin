<template>
  <div class="login">
    <div class="login-logo">
      <img src="@/assets/imgs/logo.png" />
    </div>
    <div class="login-panel">
      <div class="login-header">随心选后台管理系统</div>
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        label-width="120px"
        class="demo-ruleForm"
      >
        <el-form-item label="管理员名" prop="admin">
          <el-input v-model="ruleForm.admin" type="text" autocomplete="off" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="ruleForm.password"
            type="password"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm(ruleFormRef, ruleForm)"
            >登陆</el-button
          >
          <el-button @click="resetForm(ruleFormRef)">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { FormInstance } from "element-plus";
import { reactive, ref } from "vue";
import { rules, submitForm } from "./rules";

const ruleFormRef = ref<FormInstance>();

const ruleForm = reactive({
  password: "roletang",
  admin: "tqt",
});

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};
</script>

<style scoped lang="less">
.login {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-logo {
    position: absolute;
    top: 40px;
    left: 40px;
    width: 100px;
    img {
      width: 100px;
    }
  }
  .login-header {
    color: rgb(31, 58, 58);
    font-weight: bold;
    font-size: 18px;
    height: 40px;
    line-height: 40px;
    text-align: center;
  }
}
.el-form {
  padding: 20px;
  border: 5px solid #f5f5f5;
  box-shadow: 5px 5px 5px 0 #f5f5f5;
}
</style>
