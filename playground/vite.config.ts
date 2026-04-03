import react from "@vitejs/plugin-react";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig, loadEnv } from "vite";

const playgroundDir = path.dirname(fileURLToPath(import.meta.url));

function jsonString(v: string | undefined) {
  return JSON.stringify(v ?? "");
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, playgroundDir, "");

  return {
    plugins: [react()],
    define: {
      __PLAYGROUND_ORG_URL__: jsonString(env.ORG_URL),
      __PLAYGROUND_ORG_GITHUB_URL__: jsonString(env.ORG_GITHUB_URL),
      __PLAYGROUND_ORG_PYPI_URL__: jsonString(env.ORG_PYPI_URL),
      __PLAYGROUND_ORG_LINKEDIN_URL__: jsonString(env.ORG_LINKEDIN_URL),
      __PLAYGROUND_ORG_X_URL__: jsonString(env.ORG_X_URL),
      __PLAYGROUND_ORG_MASTODON_URL__: jsonString(env.ORG_MASTODON_URL),
      __PLAYGROUND_ORG_YOUTUBE_URL__: jsonString(env.ORG_YOUTUBE_URL),
      __PLAYGROUND_CONTACT_EMAIL__: jsonString(env.CONTACT_EMAIL),
    },
    server: {
      port: 5174,
      // `file:..` links `@behindthemusictree/assets`; default watcher ignores node_modules,
      // so changes under dist/ would not refresh until restart without this.
      watch: {
        ignored: ["**/node_modules/**", "!**/node_modules/@behindthemusictree/assets/**"],
      },
    },
  };
});
