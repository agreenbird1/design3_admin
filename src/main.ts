import "@/assets/styles/index.less";
import "element-plus/es/components/message/style/css";
import { createPinia } from "pinia";
import piniaPluginPersist from "pinia-plugin-persist";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPluginPersist);

app.use(pinia);

app.use(router);

app.mount("#app");
