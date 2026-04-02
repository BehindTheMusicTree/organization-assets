import path from "node:path";
import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

const playgroundDir = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, playgroundDir, "");
  const domain = env.NEXT_PUBLIC_DOMAIN_NAME?.trim();
  if (!domain) {
    throw new Error(
      "NEXT_PUBLIC_DOMAIN_NAME is required. Copy playground/.env.example to playground/.env.",
    );
  }
  return {
    plugins: [react()],
    server: { port: 5174 },
    define: {
      "process.env.NEXT_PUBLIC_DOMAIN_NAME": JSON.stringify(domain),
    },
  };
});
