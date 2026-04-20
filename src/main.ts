import { createApp } from "vue";
import ElementPlus from 'element-plus' //全局引入
import 'element-plus/dist/index.css'
import App from "./App.vue";
import router from "./router";
// import Antd from 'ant-design-vue';
// import 'ant-design-vue/dist/reset.css';
// import { createPinia } from "pinia";
import "./styles/tailwind.css";

createApp(App).use(router).use(ElementPlus).mount("#app");






