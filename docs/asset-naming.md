# Asset naming

Conventions for raster and vector files in this package (`src/brand/`, `src/favicons/`, `src/banners/`, future `src/illustrations/`, etc.).

For **format choice, extensions, pixel sizes, and export quality** for brand marks and lockups, see [`src/brand/README.md`](../src/brand/README.md).
For banner-specific guidance, see [`src/banners/README.md`](../src/banners/README.md) (indexed in [`docs/README.md`](README.md)).

## Table of contents

- [Rules](#rules)
- [Lockup kinds (open vs enclosed)](#lockup-kinds-open-vs-enclosed)
- [Examples](#examples)
- [Placement for logo families](#placement-for-logo-families)
- [Checklist for new assets](#checklist-for-new-assets)

## Rules

1. **kebab-case only** — Lowercase words separated by hyphens. No spaces, underscores, or `camelCase`. Stays predictable on case-sensitive servers and in URLs.

2. **Spell out product or domain names** — Avoid opaque abbreviations in published filenames (e.g. prefer `grow-the-music-tree` over `gtmt`). Short folder names are fine when they are full words (`behind-the-music-tree/`), not acronyms meant for filenames.

3. **Role before the extension** — Use a short, consistent suffix so the kind of asset is obvious:
   - `-mark` — Symbol-only / app icon style
   - `-wordmark` — Text-only project name
   - `-lockup` — Symbol + text combined (see [Lockup kinds](#lockup-kinds-open-vs-enclosed))
   - `-logo` — Deprecated legacy role (use only when documenting old paths)
   - `-icon` — Small UI glyph (toolbar, list row)
   - `-illustration` — Non-logo artwork
   - `-banner` — Wide promotional/hero artwork
   - `-og` — Open Graph / social preview image

4. **One idea per file** — Do not encode multiple variants in one name beyond the role; use separate files or a documented variant pattern (below).

5. **Variants** — When you add themes or densities, append before the extension:
   - Theme: `product-lockup-dark.png`, `product-lockup-light.png`
   - Orientation (only when both are shipped): `product-lockup-horizontal.svg`, `product-lockup-stacked.svg`
   - **Badge / enclosed** (only when both an open and an enclosed lockup ship for the same orientation): `product-lockup-horizontal-badge.png` — pill, capsule, or rounded chip behind the mark + type (see [Lockup kinds](#lockup-kinds-open-vs-enclosed) and [`src/brand/README.md`](../src/brand/README.md#enclosed-lockup-badge-or-pill))
   - Greyscale (optional; only when a committed asset is required): `product-lockup-greyscale.svg` — see [`src/brand/README.md`](../src/brand/README.md) for when to add this versus using CSS.
   - Raster scale: `product-lockup@2x.png` (only if you ship multiple bitmaps; prefer SVG when possible)

6. **Format** — Keep the real format in the extension (`.svg`, `.png`, `.webp`). Do not use misleading extensions.

7. **Folders mirror meaning** — Use **one folder per project** under `src/brand/<project-slug>/` (same slug as `src/favicons/<project-slug>/`). Do not put every product’s files in a single umbrella folder. Avoid source-based names like `brand/cv/`. Export map in `package.json` should follow the same path.
8. **Favicons use dedicated bundles** — Keep one bundle per project in `src/favicons/<project-slug>/` (see [`src/favicons/README.md`](../src/favicons/README.md)).
9. **Banners use dedicated folders** — Keep one banner set per project in `src/banners/<project-slug>/` (see [`src/banners/README.md`](../src/banners/README.md)).
10. **Brand artwork formats** — Formats, dimensions, and greyscale rules for `src/brand/` are in [`src/brand/README.md`](../src/brand/README.md) (overview in [`docs/README.md`](README.md#brand-assets-marks-and-lockups)).

## Lockup kinds (open vs enclosed)

All of these use the **`-lockup`** role (plus **`-horizontal`** or **`-stacked`** when you ship more than one orientation).

- **Open (knockout) lockup** — Symbol and wordmark on a **transparent** background; the UI supplies the surface color.
- **Enclosed (badge / pill) lockup** — Same composition, but inside a **defined shape** (white or tinted pill, rounded rectangle, chip). The container is part of the asset. Filename: add the **`…-badge`** segment when both open and enclosed versions exist for that orientation (for example `the-music-tree-lockup-horizontal-badge.png` vs `the-music-tree-lockup-horizontal.png`). Full spec: [`src/brand/README.md`](../src/brand/README.md#enclosed-lockup-badge-or-pill).

## Examples

| Good | Avoid |
|------|--------|
| `audiometa-mark.png` | `am-logo.png`, `AM_Logo.png` |
| `audiometa-lockup.svg` | `audiometa-logo-with-text.svg` |
| `audiometa-wordmark.svg` | `audiometa-text.svg` |
| `audiometa-lockup-horizontal.svg` | `audiometa-horizontal.svg` |
| `the-music-tree-lockup-horizontal-badge.png` | `tmt-pill-logo.png` |
| `behind-the-music-tree-mark.png` | `btmt-logo.png`, `BTMT.png` |
| `grow-the-music-tree-mark.png` | `gtmt.png` |
| `brand/hear-the-music-tree/hear-the-music-tree-mark.png` | `brand/cv/htmt.png` |
| `grow-the-music-tree-banner-mobile.webp` | `hero-mobile-final.webp` |

## Placement for logo families

Store all brand files for a project together under:

- `src/brand/<project-slug>/`

Keep related `-mark`, `-wordmark`, and `-lockup` files side by side in the same folder so imports and export paths stay predictable.

## Checklist for new assets

- [ ] kebab-case filename with clear product/domain name  
- [ ] Appropriate role suffix (`-mark`, `-wordmark`, `-lockup`, `-icon`; avoid `-logo` for new assets)  
- [ ] Placed under a semantic folder  
- [ ] `package.json` `exports` and `build` copy step updated if the path is new  
- [ ] Brand file specs (format, dimensions, variants) follow [`src/brand/README.md`](../src/brand/README.md) where applicable  
- [ ] Favicon files (if any) are grouped in `src/favicons/<project-slug>/` and follow [`src/favicons/README.md`](../src/favicons/README.md)  
- [ ] Banner files (if any) are grouped in `src/banners/<project-slug>/` and follow [`src/banners/README.md`](../src/banners/README.md)  
