import { defineConfig } from "vite";
import AutoImport from "unplugin-auto-import/vite";
import { NaiveUiResolver } from "unplugin-vue-components/resolvers";
import Components from "unplugin-vue-components/vite";
import vue from "@vitejs/plugin-vue";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: ["vue"],
    }),
    Components({
      resolvers: [NaiveUiResolver()],
      dirs: ["src/components"],
      extensions: ["vue"],
      deep: true,
    }),
  ],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
