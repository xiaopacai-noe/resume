import { createPinia } from "pinia";
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate)
export { useResumeStyleStore } from "./resumeStyle";
export { useModuleThStore } from "./module";
export default function (app) {
  app.use(pinia);
}
