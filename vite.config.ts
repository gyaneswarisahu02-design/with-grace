import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),

    VitePWA({
      registerType: "autoUpdate",

      manifest: {
        name: "With Grace",
        short_name: "Grace",
        description: "Smoke-free tracker & wellbeing app",
        theme_color: "#274C77",
        background_color: "#F5F9FC",
        display: "standalone",
        start_url: "/",

        icons: [
          {
            src: "/pwa-192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/pwa-512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
});