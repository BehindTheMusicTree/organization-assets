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

## [2.0.0] - 2026-04-02

### BREAKING CHANGE

- **Brand export path**: Removed `./icons` subpath. Static brand assets are under `./brand` (source: `src/brand/`). Update imports from `@behindthemusictree/assets/icons/...` to `@behindthemusictree/assets/brand/...`. See [`docs/migrations/icons-to-brand.md`](docs/migrations/icons-to-brand.md). Release as **major** version.
- **Brand folder layout**: Marks and lockups use **`./brand/<project-slug>/`** per product (aligned with favicon bundles), not a single umbrella folder mixing every product under `behind-the-music-tree/`. Example: `brand/audiometa/audiometa-mark.png` replaces `brand/behind-the-music-tree/audiometa-mark.png`. **Breaking** for consumers using umbrella paths; see migration doc.

### Added

- **Banners export**: `"./banners/*"` in `package.json`; build copies each `src/banners/<project-slug>/` into `dist/banners/` (parity with per-project `brand/` and `favicons/`).

### Changed

- **Logo naming migration**: Renamed symbol-only assets from `*-logo.*` to `*-mark.*` under `src/brand/<project-slug>/` to align role semantics

### Documentation

- **README**: Added ecosystem section with portfolio link (`themusictree.org`) and clarified portfolio source (`the-music-tree-frontend`) for this shared package.
- **Logo naming docs and Cursor rules**: Clarified role semantics (`-mark` for symbol-only, `-lockup` for symbol+text, `-wordmark` for text-only) and deprecated legacy `-logo` naming
- **Documentation index**: Added `docs/README.md` linking global guides and colocated `src/*/README.md` specs; removed redundant `docs/banner-assets.md` stub
- **Banner docs and Cursor rules**: Canonical banner spec in `src/banners/README.md`; **one directory per project** under `src/banners/<project-slug>/`, import path `./banners/…`, documented alongside brand/favicons
- **Banner platform standards**: Documented social media export sizes and platform-specific filename suffixes (X, LinkedIn, Facebook, Mastodon, Instagram)
- **Brand folder and docs**: `src/brand/README.md`, migration guide `docs/migrations/icons-to-brand.md`; Cursor rule `static-assets-and-docs.mdc` (replaces `static-icons-and-docs.mdc`)
- **Logo vs favicon docs**: `docs/logo-assets.md` scoped to `src/brand/` marks/lockups; favicon bundle layout and PWA sizes moved to `src/favicons/README.md`
- **Documentation TOC**: Added GitHub-style **Table of contents** to multi-section Markdown across the repo (root `README.md`, `src/*/README.md`, `docs/`); Cursor rules and `CONTRIBUTING.md` note the requirement (`CHANGELOG.md` and one-section stubs exempt)
- **Brand docs colocation**: Full mark/lockup format and dimension spec moved to `src/brand/README.md`; removed `docs/logo-assets.md`; brand overview and naming links live in [`docs/README.md`](docs/README.md) (`asset-naming.md` remains the detailed naming guide)

## [1.1.2] - 2026-04-01

### Added

- **Audiometa greyscale logo**: `audiometa-mark-greyscale.svg` (sRGB luminance filter) for contexts that need a committed greyscale mark

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
