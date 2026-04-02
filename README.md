# @behindthemusictree/assets

Shared assets (components, design tokens, icons, styles, hooks, utils) for React projects across the organization.

## Ecosystem

Built inside the **[BehindTheMusicTree](https://github.com/BehindTheMusicTree)** ecosystem.

Want the big picture? Explore the full project universe on **[themusictree.org](https://themusictree.org)**. This package is **`@behindthemusictree/assets`** — the shared components, tokens, and icons used by our web apps.

The portfolio website content lives in **[the-music-tree-frontend](https://github.com/BehindTheMusicTree/the-music-tree-frontend)**; this README focuses on developing, versioning, and publishing this package.

## Structure

- **components** – Reusable React components (e.g. `Button`)
- **tokens** – Design tokens (colors, spacing, radius) as CSS vars and JS
- **icons** – Raster or SVG marks ([`docs/asset-naming.md`](docs/asset-naming.md), [`docs/logo-assets.md`](docs/logo-assets.md))
- **favicons** – Per-project favicon bundles (`src/favicons/<project>/`)
- **styles** – Global resets and shared CSS (import tokens)
- **hooks** – Shared React hooks
- **utils** – Helpers and constants

## Install

The package is published to [GitHub Packages](https://github.com/orgs/BehindTheMusicTree/packages). Consuming repos need an `.npmrc` that points the scope to GitHub's registry:

```
@behindthemusictree:registry=https://npm.pkg.github.com
```

Then install normally:

```bash
npm install @behindthemusictree/assets
```

## Usage

Use subpath imports so apps only pull what they need:

```tsx
import { Button } from "@behindthemusictree/assets/components";
import { colors, spacing } from "@behindthemusictree/assets/tokens";
import "@behindthemusictree/assets/styles";
```

**TheMusicTreeByline** — single clickable image: **`the-music-tree-lockup-horizontal.svg`** only (no extra text node). Default display height **36px**, width **auto**. Pass **`href`** from **`getOrgSiteHref()`** (reads **`NEXT_PUBLIC_DOMAIN_NAME`**, which should mirror GitHub **`DOMAIN_NAME`**). There is **no default**: if the variable is unset, **`getOrgSiteHref()`** throws and the build fails. Use **`variant="onDark"`** only for monochrome/black lockups on dark surfaces (CSS invert); omit for full-color lockup artwork.

```tsx
import { TheMusicTreeByline, getOrgSiteHref } from "@behindthemusictree/assets/components";

<TheMusicTreeByline
  href={getOrgSiteHref()}
  variant="onDark"
  className="border border-white/15 bg-white/5 p-2 hover:bg-white/10"
/>
```

BehindTheMusicTree logos (PNG):

```tsx
import orgLogo from "@behindthemusictree/assets/icons/behind-the-music-tree/behind-the-music-tree-logo.png";
```

Project favicon bundle:

```tsx
import faviconSvg from "@behindthemusictree/assets/favicons/behind-the-music-tree/favicon.svg";
```

Naming and logo export rules: [`docs/asset-naming.md`](docs/asset-naming.md), [`docs/logo-assets.md`](docs/logo-assets.md).

Or from the main entry:

```tsx
import { Button, colors } from "@behindthemusictree/assets";
```

Ensure design tokens are loaded (e.g. import `@behindthemusictree/assets/styles` once in your app root, or import `@behindthemusictree/assets/tokens` and include the tokens CSS in your build).

## Publishing

A GitHub Actions workflow automatically publishes to GitHub Packages whenever a version tag is pushed. To cut a new version:

```bash
npm run release -- patch   # or minor / major
```

This bumps the version, stamps the changelog, commits, tags, and pushes. Publishing starts automatically. See [CONTRIBUTING.md](CONTRIBUTING.md#6-releasing-for-maintainers) for details.

## Build

```bash
npm install
npm run build
```

Output is in `dist/`.

## Local development

From this repo: `npm link`. In your React app: `npm link @behindthemusictree/assets`. Use `npm run dev` here for watch mode.
