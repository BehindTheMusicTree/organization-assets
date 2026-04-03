import { defineConfig } from "tsup";

/** Inlined into published JS/CJS when this package is built (set ORG_URL / DOMAIN_NAME in CI). */
const orgUrlLiteral = JSON.stringify(process.env.ORG_URL ?? "");
/** GitHub Sponsors button URL (or other iframe src) for **BtmtSponsorButton**; optional. */
const sponsorButtonUrlLiteral = JSON.stringify(
  process.env.ORG_SPONSOR_BUTTON_URL ?? "",
);

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
  },
  loader: {
    ".svg": "dataurl",
    ".png": "dataurl",
  },
});
