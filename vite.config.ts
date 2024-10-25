import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "https://nadifdzaikra.github.io/pokemon/",
  build: {
    outDir: "build",
  },
});
