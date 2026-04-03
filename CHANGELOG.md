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
