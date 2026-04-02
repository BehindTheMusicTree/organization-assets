# @behindthemusictree/assets

Shared assets (components, design tokens, brand artwork, styles, hooks, utils) for React projects across the organization.

## Table of contents

- [Ecosystem](#ecosystem)
- [Structure](#structure)
- [Install](#install)
- [Usage](#usage)
- [Publishing](#publishing)
- [Build](#build)
- [Local development](#local-development)

## Ecosystem

Built inside the **[BehindTheMusicTree](https://github.com/BehindTheMusicTree)** ecosystem.

Want the big picture? Explore the full project universe on **[themusictree.org](https://themusictree.org)**. This package is **`@behindthemusictree/assets`** — the shared components, tokens, and brand assets used by our web apps.

The portfolio website content lives in **[the-music-tree-frontend](https://github.com/BehindTheMusicTree/the-music-tree-frontend)**; this README focuses on developing, versioning, and publishing this package.

## Structure

- **components** – Reusable React components (e.g. `Button`)
- **tokens** – Design tokens (colors, spacing, radius) as CSS vars and JS
- **brand** – Static brand marks and lockups (`src/brand/`, canonical spec [`src/brand/README.md`](src/brand/README.md); naming [`docs/asset-naming.md`](docs/asset-naming.md))
- **favicons** – Per-project favicon bundles (`src/favicons/<project>/`, [`src/favicons/README.md`](src/favicons/README.md))
- **banners** – Optional hero/social artwork (`src/banners/<project>/`, [`src/banners/README.md`](src/banners/README.md))
- **docs** – [Asset documentation index](docs/README.md): **naming** ([`asset-naming.md`](docs/asset-naming.md)), **brand overview** (marks/lockups → [`src/brand/README.md`](src/brand/README.md)), and links to colocated `src/*/README.md` specs
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

BehindTheMusicTree marks (PNG):

```tsx
import orgLogo from "@behindthemusictree/assets/brand/behind-the-music-tree/behind-the-music-tree-mark.png";
import productMark from "@behindthemusictree/assets/brand/audiometa/audiometa-mark.svg";
```

Project favicon bundle:

```tsx
import faviconSvg from "@behindthemusictree/assets/favicons/behind-the-music-tree/favicon.svg";
```

Banner (per-project folder under `./banners/`):

```tsx
import hero from "@behindthemusictree/assets/banners/grow-the-music-tree/grow-the-music-tree-banner-mobile.webp";
```

Asset naming and brand specs: start at [`docs/README.md`](docs/README.md); detailed naming in [`docs/asset-naming.md`](docs/asset-naming.md); mark/lockup formats in [`src/brand/README.md`](src/brand/README.md).

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
