import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    https: {
      key: "certificates/key.pem",
      cert: "certificates/cert.pem",
    },
  },
});
