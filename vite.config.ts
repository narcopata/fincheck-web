import preact from "@preact/preset-vite";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact()],
  server: {
    open: true,
  },
  resolve: {
    alias: {
      "@components": "/src/view/components",
      "@config": "/src/app/config",
      "@constants": "/src/app/constants",
      "@services": "/src/app/services",
      "@utils": "/src/app/utils",
      "@assets": "/src/assets",
      "@hooks": "/src/app/hooks",
      "@contexts": "/src/app/contexts",
      "@entities": "/src/app/entities",
    }
  }
});
