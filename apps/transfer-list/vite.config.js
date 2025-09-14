import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/react-components/transfer-list/",
  build: {
    outDir: "../../.dist/transfer-list",
    emptyOutDir: false,
  },
});
