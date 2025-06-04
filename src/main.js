import { createApp } from "vue";
import "normalize.css";
import router from "@/router";
import usePinia from "@/store";
import App from "./App.vue";
const app = createApp(App);
usePinia(app);
app.use(router);
app.mount("#app");
