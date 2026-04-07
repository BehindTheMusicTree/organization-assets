# Migration: `icons` exports → `brand`

`@behindthemusictree/assets` no longer exposes the `./icons` subpath. Static brand artwork (marks, lockups, wordmarks) now lives under **`./brand`**, and source files are under `src/brand/`.

## Table of contents

- [What to change](#what-to-change)
- [Per-project brand folders](#per-project-brand-folders)
- [Filename corrections (the-music-tree stacked lockup)](#filename-corrections-the-music-tree-stacked-lockup)
- [Versioning](#versioning)

## What to change

Replace import paths:

| Before | After |
|--------|--------|
| `@behindthemusictree/assets/icons/...` | `@behindthemusictree/assets/brand/...` |

Example:

```diff
-import orgLogo from "@behindthemusictree/assets/icons/behind-the-music-tree/behind-the-music-tree-mark.png";
+import orgLogo from "@behindthemusictree/assets/brand/the-music-tree/the-music-tree-lockup-stacked.png";
```

The compiled package subpath `./brand` mirrors the old `./icons` pattern:

- `./brand` — JS entry re-export (same role as before)
- `./brand/<project-slug>/*` — static files per project folder (`<project-slug>` matches the product, e.g. `audiometa`, not an umbrella path mixing every mark)

## Per-project brand folders

If you adopted paths that put **every** mark under `brand/behind-the-music-tree/...`, update to **one folder per product**, aligned with `src/favicons/<project-slug>/`:

| Old | New |
|-----|-----|
| `.../brand/behind-the-music-tree/audiometa-mark.png` | `.../brand/audiometa/audiometa-mark.png` |
| `.../brand/behind-the-music-tree/grow-the-music-tree-mark.svg` | `.../brand/grow-the-music-tree/grow-the-music-tree-mark.svg` |
| `.../brand/behind-the-music-tree/hear-the-music-tree-mark.svg` | `.../brand/hear-the-music-tree/hear-the-music-tree-mark.svg` |
| `.../brand/behind-the-music-tree/the-music-tree-mark.png` | `.../brand/the-music-tree/the-music-tree-lockup-stacked.png` |

Paths for **BehindTheMusicTree** itself stay under `brand/behind-the-music-tree/`.

This layout change is **breaking** for consumers who imported non-BTMT marks via the umbrella folder.

## Filename corrections (the-music-tree stacked lockup)

The stacked (vertical) artwork — symbol + wordmark — uses **`…-lockup-stacked`**, not **`…-mark`**:

- **`the-music-tree-mark.svg`** → **`the-music-tree-lockup-stacked.svg`**
- **`the-music-tree-mark.png`** → **`the-music-tree-lockup-stacked.png`**

See [`docs/asset-naming.md`](../asset-naming.md) — orientation **`…-lockup-stacked`**. Update any direct imports that still use the old filenames.

## Versioning

`icons` → `brand` and per-project brand folders are **breaking**. Upgrade with a **major** version bump of `@behindthemusictree/assets`, then search your apps for `assets/icons`, wrong `brand/behind-the-music-tree/` prefixes, and update imports.
