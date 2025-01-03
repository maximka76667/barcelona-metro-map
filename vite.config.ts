import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // https: {
    //   key: "certificates/key.pem",
    //   cert: "certificates/cert.pem",
    // },
    proxy: {
      "/api": {
        target:
          "https://barcelona-urban-mobility-graphql-api.netlify.app/graphql",
        changeOrigin: true,
        secure: false,
        ws: true,
      },
    },
  },
});
