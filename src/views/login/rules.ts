import { login } from "@/api";
import router from "@/router";
import { useAdminStore } from "@/stores/admin";
import { ElMessage } from "element-plus";
import { reactive } from "vue";
import { adminRoute } from "@/router";
import type { IAdminLogin } from "@/api/types";
import type { FormInstance } from "element-plus";

const adminStore = useAdminStore();

// 检验器必须返回一个布尔
const validateAdmin = (rule: any, value: string, callback: any) => {
  if (value === "") {
    callback(new Error("管理员名不能为空！"));
  } else {
    return true;
  }
};
const validatePassword = (rule: any, value: string, callback: any) => {
  if (value === "") {
    callback(new Error("密码不能为空！"));
  } else {
    return true;
  }
};

export const rules = reactive({
  admin: [{ validator: validateAdmin, trigger: "blur" }],
  password: [{ validator: validatePassword, trigger: "blur" }],
});

export const submitForm = (
  formEl: FormInstance | undefined,
  ruleForm: IAdminLogin
) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      login(ruleForm).then((res) => {
        if (res.status !== 200) {
          ElMessage.error(res.data);
        } else {
          if (res.data.type === "1") {
            router.addRoute("layout", adminRoute);
          }
          if (res.data.forbidden === "1") {
            ElMessage.error("对不起！您的权限已被禁用！");
          } else {
            ElMessage.success("登陆成功");
            adminStore.$patch({
              ...res.data,
            });
            router.push("/");
          }
        }
      });
    }
  });
};
