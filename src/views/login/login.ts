import { reactive } from "vue";

const validateAdmin = (rule: any, value: string, callback: any) => {
  if (value === "") {
    callback(new Error("管理员名不能为空！"));
  }
};
const validatePassword = (rule: any, value: string, callback: any) => {
  if (value === "") {
    callback(new Error("密码不能为空！"));
  }
};

export const rules = reactive({
  admin: [{ validator: validateAdmin, trigger: "blur" }],
  password: [{ validator: validatePassword, trigger: "blur" }],
});
