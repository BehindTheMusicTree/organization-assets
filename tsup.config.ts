import { defineConfig } from "tsup";

/** Inlined into published JS/CJS when this package is built (set ORG_URL / DOMAIN_NAME in CI). */
const orgUrlLiteral = JSON.stringify(process.env.ORG_URL ?? "");
/** GitHub Sponsors button URL (or other iframe src) for **BtmtSponsorButton**; **required** at build (**`assert-org-url.mjs`**). */
const sponsorButtonUrlLiteral = JSON.stringify(
  process.env.ORG_SPONSOR_BUTTON_URL ?? "",
);
/** Defaults for **`Social*Link`** (same env as **`playground/.env`** / publish workflow). */
const orgGithubUrlLiteral = JSON.stringify(process.env.ORG_GITHUB_URL ?? "");
const orgPypiUrlLiteral = JSON.stringify(process.env.ORG_PYPI_URL ?? "");
const orgLinkedinUrlLiteral = JSON.stringify(process.env.ORG_LINKEDIN_URL ?? "");
const orgXUrlLiteral = JSON.stringify(process.env.ORG_X_URL ?? "");
const orgMastodonUrlLiteral = JSON.stringify(process.env.ORG_MASTODON_URL ?? "");
const orgYoutubeUrlLiteral = JSON.stringify(process.env.ORG_YOUTUBE_URL ?? "");
const contactEmailLiteral = JSON.stringify(process.env.CONTACT_EMAIL ?? "");

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
    "process.env.CONTACT_EMAIL": contactEmailLiteral,
  },
  loader: {
    ".svg": "dataurl",
    ".png": "dataurl",
  },
});
