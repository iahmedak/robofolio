import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ base }) => ({
  // If deploying to GitHub Pages, use '/robofolio/'.
  // If deploying to Cloudflare Pages or a custom domain, use '/'.
  base: process.env.NODE_ENV === 'production' && !process.env.CLOUDFLARE ? "/robofolio/" : "/",
  plugins: [react(), tailwindcss()],
}));
