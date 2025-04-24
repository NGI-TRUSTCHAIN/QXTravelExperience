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
          // Split vendor code into separate chunks
          react: ["react", "react-dom", "react-router-dom"],
          radix: [
            "@radix-ui/react-accordion",
            "@radix-ui/react-checkbox",
            "@radix-ui/react-dialog",
            "@radix-ui/react-dropdown-menu",
            "@radix-ui/react-label",
            "@radix-ui/react-popover",
            "@radix-ui/react-scroll-area",
            "@radix-ui/react-select",
            "@radix-ui/react-separator",
            "@radix-ui/react-slot",
            "@radix-ui/react-switch",
            "@radix-ui/react-tabs",
            "@radix-ui/react-toast",
            "@radix-ui/react-tooltip",
            "@radix-ui/react-alert-dialog",
            "@radix-ui/react-use-size",
          ],
          dnd: [
            "@dnd-kit/core",
            "@dnd-kit/modifiers",
            "@dnd-kit/sortable",
            "@dnd-kit/utilities",
          ],
          form: ["@hookform/resolvers", "react-hook-form"],
          table: ["@tanstack/react-table"],
          utils: [
            "@faker-js/faker",
            "axios",
            "class-variance-authority",
            "clsx",
            "date-fns",
            "file-saver",
            "react-day-picker",
            "zod",
            "zustand",
            "crypto-js",
            "embla-carousel-react",
            "cmdk",
            "react-timeago",
            "sonner",
            "framer-motion",
            "lucide-react",
            "next-themes"
          ],
          rechart: ["recharts"],
          tailwind: [
            "tailwind-merge",
            "tailwindcss-animate",
            "tailwindcss-animatecss",
          ],
          maps: ["@react-google-maps/api"],
          media: ["@react-hook/media-query"],
        },
      },
    },
    chunkSizeWarningLimit: 500,
  },
  server: {
    port: 5175
  },
  // envPrefix: "APP_"
});
