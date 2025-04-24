import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom", "react-router-dom"],
          radix: [
            "@radix-ui/react-accordion",
            "@radix-ui/react-checkbox",
            "@radix-ui/react-dialog",
            "@radix-ui/react-label",
            "@radix-ui/react-popover",
            "@radix-ui/react-scroll-area",
            "@radix-ui/react-select",
            "@radix-ui/react-separator",
            "@radix-ui/react-slot",
            "@radix-ui/react-switch",
            "@radix-ui/react-tabs",
            "@radix-ui/react-toast",
          ],
          form: ["@hookform/resolvers", "react-hook-form"],
          utils: [
            "axios",
            "class-variance-authority",
            "clsx",
            "date-fns",
            "file-saver",
            "react-day-picker",
            "zod",
            "zustand",
          ],
          tailwind: [
            "tailwind-merge",
            "tailwindcss-animate",
            "tailwindcss-animatecss",
          ],
        },
      },
    },
    chunkSizeWarningLimit: 500,
  },
  // envPrefix: "APP_"
});
