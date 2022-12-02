import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

import dns from "dns";

dns.setDefaultResultOrder("verbatim");

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  /* devServer: {
    proxy: {
      "*": {
        target: "http://localhost/",
        ws: true,
        changeOrigin: true,
      },
    },
  },
  server: {
    proxy: {
      "*": {
        target: "http://localhost/",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
      cors: false,
    },
  },
  define: {
    "process.env": {},
  }, */
});
