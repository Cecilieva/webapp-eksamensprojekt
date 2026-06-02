import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import pkg from "./package.json";

export default defineConfig(({ command }) => {
  return {
    plugins: [react()],
    base: command === "serve" ? "/" : pkg.base,
  };
});
