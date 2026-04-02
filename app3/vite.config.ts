import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  base: "/app3",
  plugins: [
    react(),
    {
      name: "inject-layout-shell",
      transformIndexHtml: {
        order: "post",
        handler(html) {
          return html.replace(
            "</body>",
            `  <script src="/layout/shell.js"></script>
</body>`,
          );
        },
      },
    },
  ],
});
