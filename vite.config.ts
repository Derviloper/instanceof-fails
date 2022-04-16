import path from "path";
import vue from "@vitejs/plugin-vue";
import vueI18n from "@intlify/vite-plugin-vue-i18n";
import { defineConfig } from "vite";
import { fileURLToPath, URL } from "url";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueI18n({
      defaultSFCLang: "json",
      include: path.resolve(__dirname, "./src/locales/**/*.json"),
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: { hmr: { protocol: "ws", host: "localhost" } },
  build: { assetsDir: "assets/vue" },
  test: {
    include: ["./src/test/**/*.test.ts"],
    environment: "jsdom",
    threads: false,
  },
});
