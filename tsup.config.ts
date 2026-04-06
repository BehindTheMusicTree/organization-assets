import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "tsup";

function loadPlaygroundDotenv(filePath: string): Record<string, string> {
  if (!fs.existsSync(filePath)) return {};
  const out: Record<string, string> = {};
  for (const rawLine of fs.readFileSync(filePath, "utf8").split("\n")) {
    const line = rawLine.replace(/^\uFEFF/, "").trim();
    if (!line || line.startsWith("#")) continue;
    const m = /^([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/.exec(line);
    if (!m) continue;
    let v = m[2].trim();
    if (
      (v.startsWith('"') && v.endsWith('"')) ||
      (v.startsWith("'") && v.endsWith("'"))
    ) {
      v = v.slice(1, -1);
    }
    out[m[1]] = v;
  }
  return out;
}

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)));
const buildEnv = {
  ...loadPlaygroundDotenv(path.join(repoRoot, "playground", ".env")),
  ...process.env,
};

/** Same merge order as **`scripts/assert-org-url.mjs`** (file then shell). */
const orgUrlLiteral = JSON.stringify(buildEnv.ORG_URL ?? "");
const sponsorButtonUrlLiteral = JSON.stringify(
  buildEnv.ORG_SPONSOR_BUTTON_URL ?? "",
);
const orgGithubUrlLiteral = JSON.stringify(buildEnv.ORG_GITHUB_URL ?? "");
const orgPypiUrlLiteral = JSON.stringify(buildEnv.ORG_PYPI_URL ?? "");
const orgLinkedinUrlLiteral = JSON.stringify(buildEnv.ORG_LINKEDIN_URL ?? "");
const orgXUrlLiteral = JSON.stringify(buildEnv.ORG_X_URL ?? "");
const orgMastodonUrlLiteral = JSON.stringify(buildEnv.ORG_MASTODON_URL ?? "");
const orgYoutubeUrlLiteral = JSON.stringify(buildEnv.ORG_YOUTUBE_URL ?? "");
const orgSpotifyUrlLiteral = JSON.stringify(buildEnv.ORG_SPOTIFY_URL ?? "");
const orgDiscordUrlLiteral = JSON.stringify(buildEnv.ORG_DISCORD_URL ?? "");
const contactEmailLiteral = JSON.stringify(buildEnv.CONTACT_EMAIL ?? "");

export default defineConfig({
  entry: {
    index: "src/index.ts",
    "components/index": "src/components/index.ts",
    "brand/index": "src/brand/index.ts",
    "tokens/index": "src/tokens/index.ts",
    "hooks/index": "src/hooks/index.ts",
    "utils/index": "src/utils/index.ts",
  },
  format: ["esm", "cjs"],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  external: ["react", "react-dom"],
  define: {
    "process.env.ORG_URL": orgUrlLiteral,
    "process.env.ORG_SPONSOR_BUTTON_URL": sponsorButtonUrlLiteral,
    "process.env.ORG_GITHUB_URL": orgGithubUrlLiteral,
    "process.env.ORG_PYPI_URL": orgPypiUrlLiteral,
    "process.env.ORG_LINKEDIN_URL": orgLinkedinUrlLiteral,
    "process.env.ORG_X_URL": orgXUrlLiteral,
    "process.env.ORG_MASTODON_URL": orgMastodonUrlLiteral,
    "process.env.ORG_YOUTUBE_URL": orgYoutubeUrlLiteral,
    "process.env.ORG_SPOTIFY_URL": orgSpotifyUrlLiteral,
    "process.env.ORG_DISCORD_URL": orgDiscordUrlLiteral,
    "process.env.CONTACT_EMAIL": contactEmailLiteral,
  },
  loader: {
    ".svg": "dataurl",
    ".png": "dataurl",
  },
});
