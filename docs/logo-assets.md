# Logo assets: formats, extensions, and dimensions

Guidance for logos and marks shipped in this package (`*-logo.png`, `*-mark.svg`, etc.). Aligns with [`asset-naming.md`](asset-naming.md).

## Preferred formats (in order)

1. **SVG (`.svg`)** — Default for web when the artwork is vector-friendly: infinite scaling, usually smaller than high-res PNG, easy to theme with CSS (`currentColor`, `fill`). Use for wordmarks and simple marks without heavy raster effects.

2. **PNG (`.png`)** — Use when the design relies on fine gradients, photos, or effects that do not export cleanly to SVG, or when the org standard is raster lockups. Prefer **24-bit RGBA** with transparency for UI; avoid indexed PNG unless file size is critical and quality is acceptable.

3. **WebP (`.webp`)** — Optional **delivery** format in apps (smaller than PNG at similar quality). For **this repo**, prefer shipping **SVG or PNG** as the source of truth; apps may convert or serve WebP at build/CDN time. If you commit WebP here, keep a PNG or SVG alongside for tooling that does not support WebP.

Avoid **JPEG** for logos on arbitrary backgrounds (no alpha). Use JPEG only for photo-based wordmarks where a rectangular crop is intentional.

## Extensions

The file extension must match the encoded format (see naming guide). Common cases:

| Extension | Typical use |
|-----------|-------------|
| `.svg` | Vector logo or mark |
| `.png` | Raster logo with transparency |
| `.webp` | Raster alternative (if explicitly committed) |

Do not use `.jpg`/`.jpeg` for assets that need transparency behind the mark.

## Favicon bundle location (required)

Store one favicon bundle per project under:

- `src/favicons/<project-slug>/`

Use kebab-case project slugs (same style as `src/icons/`). Keep the full bundle together instead of scattering files across icon folders.

Example:

- `src/favicons/behind-the-music-tree/favicon.svg`
- `src/favicons/behind-the-music-tree/favicon.ico`
- `src/favicons/behind-the-music-tree/apple-touch-icon.png`
- `src/favicons/behind-the-music-tree/icon-192.png`
- `src/favicons/behind-the-music-tree/icon-512.png`

Package import path:

- `@behindthemusictree/assets/favicons/<project-slug>/<file>`

## Dimensions and resolution

Think in **CSS pixels** for layout and **intrinsic** bitmap size for clarity on retina displays.

### Horizontal / wordmark logos (`-logo`)

- **Target display width** in UIs is often **96–200px** wide (nav, footer); hero use can be larger.
- **Raster exports:** provide art at **2×** the maximum display width you support, or **cap the long edge** around **512–800px** if the logo is simple—enough for retina headers without oversized files.
- **Minimum:** avoid exporting below **~120px** on the long edge for primary logos; tiny bitmaps look soft when scaled up.

### Square marks / app-style icons (`-mark`, `-icon`)

- **Favicon / PWA:** prefer `favicon.svg` with `favicon.ico` fallback, plus PNG app icons (`180x180`, `192x192`, `512x512` at minimum). Keep a **master** at **1024×1024** or **512×512** PNG (or SVG if vector).
- **UI list rows:** display often **24–32px**; raster source at **48–64px** minimum on the square.

### Open Graph / social (`-og`)

- Typical **1200×630** (1.91∶1) for many platforms; confirm current platform docs when adding new crops.

### SVG sizing

- Set a sensible `viewBox` and omit fixed `width`/`height` when the logo should scale with CSS, or set dimensions that match the design grid.
- For crisp alignment, prefer **integer** coordinates in the SVG where practical.

## Color, transparency, and background

- **Light + dark UI:** ship **`…-logo-light.svg`** / **`…-logo-dark.svg`** (or PNG equivalents) when a single file does not work on both; see naming guide for variant suffixes.
- **Safe area:** keep padding inside the canvas so the mark does not touch edges when used in circles or rounded avatars.

## File size (practical targets)

- **SVG:** optimize (SVGO or equivalent); typical UI logos often stay **under ~15–30KB** unless highly detailed.
- **PNG:** compress losslessly; for flat logos, **under ~100KB** at 2× nav size is a reasonable goal; investigate SVG if files grow much larger.

## Checklist for new logos

- [ ] Format matches the artwork (SVG vs PNG) and extension is correct  
- [ ] Raster long-edge or square size matches intended max display × retina, without huge unused resolution  
- [ ] Transparency or explicit light/dark variants documented in filename  
- [ ] File size reasonable; consider SVG if PNG is large and flat  
