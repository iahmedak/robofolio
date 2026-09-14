import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  // Use '/' for Cloudflare Pages (root domain)
  // and '/robofolio/' for GitHub Pages (subfolder)
  base: process.env.CF_PAGES ? "/" : "/robofolio/",
  plugins: [react(), tailwindcss()],
});
