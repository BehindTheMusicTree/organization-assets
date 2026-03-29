# Asset naming

Conventions for raster and vector files in this package (`src/icons/`, future `src/illustrations/`, etc.).

## Rules

1. **kebab-case only** — Lowercase words separated by hyphens. No spaces, underscores, or `camelCase`. Stays predictable on case-sensitive servers and in URLs.

2. **Spell out product or domain names** — Avoid opaque abbreviations in published filenames (e.g. prefer `grow-the-music-tree` over `gtmt`). Short folder names are fine when they are full words (`behind-the-music-tree/`), not acronyms meant for filenames.

3. **Role before the extension** — Use a short, consistent suffix so the kind of asset is obvious:
   - `-logo` — Wordmarks or combined marks used as a logo
   - `-mark` — Symbol-only / app icon style
   - `-icon` — Small UI glyph (toolbar, list row)
   - `-illustration` — Non-logo artwork
   - `-og` — Open Graph / social preview image

4. **One idea per file** — Do not encode multiple variants in one name beyond the role; use separate files or a documented variant pattern (below).

5. **Variants** — When you add themes or densities, append before the extension:
   - Theme: `product-logo-dark.png`, `product-logo-light.png`
   - Raster scale: `product-logo@2x.png` (only if you ship multiple bitmaps; prefer SVG when possible)

6. **Format** — Keep the real format in the extension (`.svg`, `.png`, `.webp`). Do not use misleading extensions.

7. **Folders mirror meaning** — Group by domain or product family, not by source document (e.g. `icons/behind-the-music-tree/`, not `icons/cv/`). Export map in `package.json` should follow the same path.

## Examples

| Good | Avoid |
|------|--------|
| `audiometa-logo.png` | `am-logo.png`, `AM_Logo.png` |
| `behind-the-music-tree-logo.png` | `btmt-logo.png`, `BTMT.png` |
| `grow-the-music-tree-logo.png` | `gtmt.png` |
| `icons/behind-the-music-tree/hear-the-music-tree-logo.png` | `icons/cv/htmt.png` |

## Checklist for new assets

- [ ] kebab-case filename with clear product/domain name  
- [ ] Appropriate role suffix (`-logo`, `-mark`, `-icon`, …)  
- [ ] Placed under a semantic folder  
- [ ] `package.json` `exports` and `build` copy step updated if the path is new  
