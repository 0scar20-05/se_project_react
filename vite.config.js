import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/",
  server: {
    port: 3000,
  },
});

// base: "/se_project_react/",
// http://localhost:3000/se_project_react/
