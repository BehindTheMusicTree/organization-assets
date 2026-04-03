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
      __PLAYGROUND_BTMT_DOCS_URL__: jsonString(env.BTMT_DOCS_URL),
      __PLAYGROUND_BTMT_GITHUB_LINK__: jsonString(env.BTMT_GITHUB_LINK),
      __PLAYGROUND_BTMT_GITHUB_REPO__: jsonString(env.BTMT_GITHUB_REPO),
      __PLAYGROUND_BTMT_PYPI_LINK__: jsonString(env.BTMT_PYPI_LINK),
      __PLAYGROUND_LINKEDIN_URL__: jsonString(env.LINKEDIN_URL),
      __PLAYGROUND_BTMT_X_URL__: jsonString(env.BTMT_X_URL),
      __PLAYGROUND_MASTODON_URL__: jsonString(env.MASTODON_URL),
      __PLAYGROUND_BTMT_YOUTUBE_URL__: jsonString(env.BTMT_YOUTUBE_URL),
      __PLAYGROUND_CONTACT_EMAIL__: jsonString(env.CONTACT_EMAIL),
      __PLAYGROUND_BTMT_SUPPORT_URL__: jsonString(env.BTMT_SUPPORT_URL),
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
