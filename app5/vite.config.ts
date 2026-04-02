import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vite.dev/config/
export default defineConfig({
  base: "/app5",
  plugins: [
    vue(),
    {
      name: "inject-layout-shell",
      transformIndexHtml: {
        order: "post",
        handler(html) {
          return html.replace(
            "</body>",
            `  <script src="/layout/shell.js"></script>\n</body>`,
          );
        },
      },
    },
  ],
});
