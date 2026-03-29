# @your-org/assets

Shared assets (components, design tokens, icons, styles, hooks, utils) for React projects across the organization.

## Structure

- **components** – Reusable React components (e.g. `Button`)
- **tokens** – Design tokens (colors, spacing, radius) as CSS vars and JS
- **icons** – Raster or SVG marks (see [`docs/asset-naming.md`](docs/asset-naming.md))
- **styles** – Global resets and shared CSS (import tokens)
- **hooks** – Shared React hooks
- **utils** – Helpers and constants

## Install

```bash
npm install @your-org/assets
```

Or via git: `"@your-org/assets": "git+https://..."` in your app’s `package.json`.

## Usage

Use subpath imports so apps only pull what they need:

```tsx
import { Button } from "@your-org/assets/components";
import { colors, spacing } from "@your-org/assets/tokens";
import "@your-org/assets/styles";
```

BehindTheMusicTree logos (PNG):

```tsx
import orgLogo from "@your-org/assets/icons/behind-the-music-tree/behind-the-music-tree-logo.png";
```

Naming rules for new files: [`docs/asset-naming.md`](docs/asset-naming.md).

Or from the main entry:

```tsx
import { Button, colors } from "@your-org/assets";
```

Ensure design tokens are loaded (e.g. import `@your-org/assets/styles` once in your app root, or import `@your-org/assets/tokens` and include the tokens CSS in your build).

## Build

```bash
npm install
npm run build
```

Output is in `dist/`. Consuming apps should depend on the built package (publish to a private registry or use a git dependency).

## Local development

From this repo: `npm link`. In your React app: `npm link @your-org/assets`. Use `npm run dev` here for watch mode.
