# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## Changelog Best Practices

### General Principles

- Changelogs are for humans, not machines.
- Include an entry for every version, with the latest first.
- Group similar changes under: Added, Changed, Improved, Deprecated, Removed, Fixed, Documentation, Performance, CI.
- Use an "Unreleased" section for upcoming changes.
- Follow Semantic Versioning where possible.
- Use ISO 8601 date format: YYYY-MM-DD.
- Avoid dumping raw git logs; summarize notable changes clearly.

### Guidelines for Contributors

All contributors (including maintainers) should update `CHANGELOG.md` when creating PRs:

1. **Add entries to the `[Unreleased]` section** - Add your changes under the appropriate category (Added, Changed, Improved, Deprecated, Removed, Fixed, Documentation, Performance, CI)
2. **Follow the changelog format** - See examples below
3. **Group related changes** - Similar changes should be grouped together
4. **Be descriptive** - Write clear, user-focused descriptions of what changed

**Example:**

```markdown
## [Unreleased]

### Added

- **New Component**: Added `Card` component with variants for outlined and elevated styles

### Fixed

- **Token Export**: Fixed missing CSS custom property for `--color-surface`
```

**Note:** During releases, maintainers will move entries from `[Unreleased]` to a versioned section (e.g., `## [1.1.0] - 2026-04-01`).

## [Unreleased]

### Added

- **BtmtSponsorButton**: GitHub Sponsors-style **iframe**; **`src`** is **`ORG_SPONSOR_BUTTON_URL`**, inlined at package build (**tsup**). **`ORG_SPONSOR_BUTTON_URL`** is **required** for **`npm run build`** / **`npm run dev`** (**`scripts/assert-org-url.mjs`**). **Publish** workflow passes **`vars.ORG_SPONSOR_BUTTON_URL`** (required alongside **`DOMAIN_NAME`**); **`run-playground.mjs`** merges **`playground/.env`** into the root build env.

### Changed

- **Publish workflow / docs / Cursor rules**: **`publish.yml`** build **`env`** keys are documented as **required** (no “optional” wording). New **`.cursor/rules/publish-workflow.mdc`**; **`organization-assets-package.mdc`** publishing note aligned.
- **Playground social URLs**: **`ORG_GITHUB_URL`**, **`ORG_LINKEDIN_URL`** (was **`LINKEDIN_URL`**), **`ORG_MASTODON_URL`** (was **`MASTODON_URL`**), **`ORG_PYPI_URL`**, **`ORG_X_URL`**, **`ORG_YOUTUBE_URL`**, etc. are **required** for **`npm run build`** / **`npm run dev`** ( **`scripts/assert-org-url.mjs`** + **`publish.yml`**). **`ORG_GITHUB_REPO`**, **`ORG_DOCS_URL`**, **`ORG_SUPPORT_URL`**, and related playground icons (Issues, Discussions, Documentation, Support/heart) removed.

### Documentation

- **Playground**: tabbed catalog (**Components**, **Brand**, **Banners**, **Favicons**); social icon **link** buttons use required keys from **`playground/.env`** (see **`.env.example`**) inlined by Vite at dev/build time.
- **Cursor rules / CONTRIBUTING**: playground visibility for **every** new **`dist/`** surface is mandatory in the same PR; **`organization-assets-package.mdc`**, **`static-assets-and-docs.mdc`**, and Pre-PR **Build** checklist aligned.

## [4.1.0] - 2026-04-03

### Added

- **Components (social)**: SVG icons (**`IconBookOpen`**, **`IconGithub`**, **`IconPypi`**, **`IconLinkedIn`**, **`IconTwitter`**, **`IconMastodon`**, **`IconYouTube`**, **`IconEmail`**, **`IconWebsite`**, **`IconIssue`**, **`IconGitHubConversation`**, **`IconHeart`**) and **`socialLinkSizing`** utilities, exported from **`@behindthemusictree/assets/components`**.

### Documentation

- **Playground**: demo grid for social icons.

## [4.0.0] - 2026-04-03

### Changed

- **TheMusicTreeByline** / **TheMusicTreeHorizontalLink** (breaking): **`href`** is no longer a prop; **`ORG_URL`** is **required only when building this package** (no default). **tsup `define`** embeds **`ORG_URL`** into published **`dist/`** so **consuming apps** need no org env. **`getOrgSiteHref`** removed; use **`resolveOrgSiteHref()`** if you need the same string outside the component. **`npm run build`** / **`npm run dev`** run **`scripts/assert-org-url.mjs`**; **`npm run playground`** uses **`scripts/run-playground.mjs`**. **Publish** workflow sets **`ORG_URL: ${{ vars.DOMAIN_NAME }}`**. **`DEFAULT_ORG_SITE_HREF`** removed.
- **Brand (The Music Tree)**: **`the-music-tree-lockup-horizontal-dark.svg`** — explicit knockout metadata (**`fill="none"`** root, comment); same paths as before.
- **Brand (The Music Tree)**: **`the-music-tree-lockup-horizontal.svg`** — same knockout header treatment as the dark SVG (explicit transparent background, **`fill="none"`** root).
- **TheMusicTreeByline** / **TheMusicTreeHorizontalLink**: both variants use **SVG knockouts** (**`the-music-tree-lockup-horizontal.svg`** / **`-dark.svg`**) for a transparent plate; link and **`<img>`** set **`backgroundColor: transparent`**. Web-sized **PNG** knockouts remain for raster-only use.

### Documentation

- **Playground**: **TheMusicTreeHorizontalLink** variant grid (**default** vs **`onDark`**, checkerboard + dark tiles, code snippets); **Brand lockup PNG** raster row; **Vite** watches the linked package **`dist/`**; intro text notes rebuild/restart when the catalog looks stale.
- **CONTRIBUTING** / **`.cursor/rules`**: new components and published assets **must** be reflected in the **`playground/`** catalog (same change as the feature); **`organization-assets-package.mdc`** documents the requirement.

### Added

- **Brand (The Music Tree)**: **`the-music-tree-lockup-horizontal-dark.png`** — **800×250** RGBA knockout (light ink, transparent background), aligned with the web-sized default lockup PNG.

## [3.0.2] - 2026-04-03

### Documentation

- **README**: **Install** — step-by-step GitHub Packages setup (scope **`.npmrc`**, PAT / **`NODE_AUTH_TOKEN`**, CI, pinning, pnpm/Yarn).
- **docs/README**: **Installing the package** — index entry linking to the root README **Install** section.
- **CONTRIBUTING**: **Installing the package in an app** — points to the root **README** **Install** section for GitHub Packages when not using **`npm link`**.

## [3.0.1] - 2026-04-03

### Added

- **Brand (The Music Tree)**: **`the-music-tree-lockup-horizontal-dark.svg`** — light ink on transparent for dark UIs (same geometry as **`the-music-tree-lockup-horizontal.svg`**).

### Changed

- **Brand (The Music Tree)**: `the-music-tree-lockup-horizontal.png` is now a web-sized raster (**800×250**); the previous **1920×600** file ships as **`the-music-tree-lockup-horizontal-full.png`** for large displays or print.
- **TheMusicTreeByline** / **TheMusicTreeHorizontalLink**: **`variant="onDark"`** now uses the dark SVG instead of a CSS **`filter`** on the PNG.

### Improved

- **TheMusicTreeByline** / **TheMusicTreeHorizontalLink**: hover (and **`:focus-visible`** keyboard focus) slightly change the lockup aspect via **`transform: scale`**; focus shows a **2px** ring using **`currentColor`**.

## [3.0.0] - 2026-04-03

### Added

- **TheMusicTreeHorizontalLink**: exported alias for the horizontal lockup link (same as **TheMusicTreeByline**); playground shows default and **`variant="onDark"`** demos.
- **Brand**: `src/brand/the-music-tree/the-music-tree-lockup-horizontal.svg` and **`.png`** (interim copies until the official horizontal lockup ships).
- **getOrgSiteHref** / **parseOrgSiteHref**: **`getOrgSiteHref()`** for Next.js; **`parseOrgSiteHref`** for Vite + **`import.meta.env`** (dependency code does not get reliable `process.env` replacement). Dev dependency **`@types/node`** added for `process.env` typing in declaration emit.

### Fixed

- **Playground (Vite)**: blank page — `getOrgSiteHref()` lives in a pre-bundled dependency where `process` is undefined; playground now uses **`parseOrgSiteHref(import.meta.env.NEXT_PUBLIC_DOMAIN_NAME)`** and **`vite.config`** `define` + **`optimizeDeps.esbuildOptions.define`**.

### Changed

- **TheMusicTreeByline** (breaking): uses **only** `the-music-tree-lockup-horizontal.png` as the image (no separate label). **`href` is required** — **`getOrgSiteHref()`** (Next) or **`parseOrgSiteHref(…)`** (Vite + **`import.meta.env`**). **`NEXT_PUBLIC_DOMAIN_NAME`** mirrors GitHub **`DOMAIN_NAME`**. **No default URL**. Default image height **56px**, width **auto**. **`variant="onDark"`** inverts the whole lockup for dark UIs.

### Documentation

- **README**: TheMusicTreeByline lockup + **`getOrgSiteHref()`** (no default URL).
- **CONTRIBUTING**: Playground requires **`NEXT_PUBLIC_DOMAIN_NAME`** via `playground/.env`.
- **README**: Added ecosystem section with portfolio link (`themusictree.org`) and clarified portfolio source (`the-music-tree-frontend`) for this shared package.

## [1.1.2] - 2026-04-01

### Added

- **Audiometa greyscale logo**: `audiometa-logo-greyscale.svg` (sRGB luminance filter) for contexts that need a committed greyscale mark

### Documentation

- **Logo assets**: Document when to ship `-logo-greyscale.svg` versus using CSS; note filter-`id` uniqueness for inline SVG

### CI

- **GitHub Actions Runtime**: Upgraded `actions/checkout` and `actions/setup-node` to v5 to stay compatible with the Node.js 24 transition on GitHub-hosted runners; publish job now uses Node.js 22.

## [1.1.1] - 2026-03-30

### Fixed

- **Release Script**: Use annotated tags (`git tag -a`) so `git push --follow-tags` reliably pushes the tag to the remote

### Changed

- **Publish Workflow**: Trigger on `v*` tag push instead of GitHub Release event — `npm run release` is now the only step needed to publish

## [1.1.0] - 2026-03-30

### Added

- **GitHub Packages Publishing**: Added GitHub Actions workflow to automatically publish to GitHub Packages on release
- **Package Identity**: Set package name to `@behindthemusictree/assets` with `publishConfig` pointing to GitHub Packages registry

## [1.0.0] - 2026-03-30

### Added

- **Components**: Reusable React components (e.g. `Button`)
- **Design Tokens**: Colors, spacing, and radius as CSS custom properties and JS exports
- **Icons**: Organization and project logo assets under `src/icons/`
- **Favicons**: Per-project favicon bundles under `src/favicons/` (behind-the-music-tree, grow-the-music-tree)
- **Styles**: Global resets and shared CSS importing design tokens
- **Hooks**: Shared React hooks
- **Utils**: Helpers and constants
- **Build Pipeline**: tsup compilation (ESM + CJS + `.d.ts`) with post-build copy for static assets
