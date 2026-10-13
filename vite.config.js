import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base "./" => build kisi bhi hosting (Netlify, Vercel, GitHub Pages subfolder) pe chal jati hai
export default defineConfig({
  plugins: [react()],
  base: "./",
});
