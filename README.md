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

The package is published to **[GitHub Packages](https://github.com/orgs/BehindTheMusicTree/packages)** under the scope **`@behindthemusictree`**. npm must use GitHub’s registry for that scope, and you must authenticate (GitHub does not allow anonymous installs for this registry the way the public npm registry does).

### 1. Point the scope at GitHub Packages

In your **app repository root**, add or merge into **`.npmrc`**:

```ini
@behindthemusictree:registry=https://npm.pkg.github.com
```

You can put the same line in **`~/.npmrc`** instead if every project on your machine should resolve this scope the same way.

### 2. Provide a token

Create a **[classic Personal Access Token](https://github.com/settings/tokens)** with the **`read:packages`** scope. If the package or its repository is private to the org, you may also need **`repo`** (see [GitHub’s npm docs](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry)).

Add the token to **`.npmrc`** next to the line from step 1 (do **not** commit this file if it contains a raw token—use **[gitignore](https://git-scm.com/docs/gitignore)** or keep the token only in **`~/.npmrc`**):

```ini
//npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN_HERE
```

Alternatively, keep secrets out of files and reference an environment variable (works well with **direnv**, CI, and local exports):

```ini
//npm.pkg.github.com/:_authToken=${NODE_AUTH_TOKEN}
```

Then export **`NODE_AUTH_TOKEN`** (or **`GITHUB_TOKEN`** in some setups) before running **`npm install`**.

**GitHub Actions:** configure **`actions/setup-node`** with **`registry-url: 'https://npm.pkg.github.com'`** and pass **`NODE_AUTH_TOKEN: ${{ secrets.GITHUB_TOKEN }}`** (or a PAT with **`read:packages`** in **`secrets`**) so the job can install dependencies that pull this package. See [Using packages in Actions](https://docs.github.com/en/packages/learn-github-packages/about-permissions-for-github-packages#about-scopes-and-permissions-for-package-registries).

### 3. Install

```bash
npm install @behindthemusictree/assets
```

Pin a version when you want an explicit upgrade path:

```bash
npm install @behindthemusictree/assets@3.0.1
```

**pnpm** and **Yarn** can use the same **`@behindthemusictree:registry`** and host auth settings; see their docs for equivalent **`.npmrc`** / **`.yarnrc.yml`** layout if you do not use npm.

## Usage

Use subpath imports so apps only pull what they need:

```tsx
import { Button } from "@behindthemusictree/assets/components";
import { colors, spacing } from "@behindthemusictree/assets/tokens";
import "@behindthemusictree/assets/styles";
```

**TheMusicTreeByline** — single clickable **SVG knockout** (transparent outside logo + wordmark; link and image use **`backgroundColor: transparent`**). The **`href`** is **not a prop**: when **this package** is built for publish, **`ORG_URL`** (hostname or full **`https://`** URL) is read once and **embedded in `dist/`** via **tsup `define`**. **Consuming apps** normally need **no** **`ORG_URL`** env — they install a pre-built package from GitHub Packages. **Maintainers:** set **`ORG_URL`** when running **`npm run build`** / **`npm run dev`** here, and configure GitHub repository variable **`DOMAIN_NAME`** for **`.github/workflows/publish.yml`** (see **Publishing** below). **`resolveOrgSiteHref()`** and **`parseOrgSiteHref()`** are exported if you need the same URL string in app code. Default variant uses **`the-music-tree-lockup-horizontal.svg`**; **`variant="onDark"`** uses **`the-music-tree-lockup-horizontal-dark.svg`**. Default display height **56px**, width **auto**. **Web-sized PNGs** (**`the-music-tree-lockup-horizontal.png`** / **`-dark.png`**) ship for raster-only contexts (email, CMS); import from **`@behindthemusictree/assets/brand/the-music-tree/...`**.

```tsx
import { TheMusicTreeByline } from "@behindthemusictree/assets/components";

<TheMusicTreeByline
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

The **Publish** workflow passes every key in **`publish.yml`**’s **`npm run build`** **`env`** block ( **`ORG_URL`** from **`DOMAIN_NAME`**, **`ORG_SPONSOR_BUTTON_URL`**, and all playground social URLs—see **`playground/.env.example`**). Define the matching **GitHub repository variables** or the build fails. **tsup** inlines **`ORG_URL`** and **`ORG_SPONSOR_BUTTON_URL`** into **`dist/`**; the rest are required so **`scripts/assert-org-url.mjs`** and the playground catalog stay aligned.

## Build

```bash
npm install
cp playground/.env.example playground/.env   # then edit values
npm run build
```

**`scripts/assert-org-url.mjs`** requires **`playground/.env`** (or equivalent shell exports) to define **`ORG_URL`**, **`ORG_SPONSOR_BUTTON_URL`**, and every playground social key listed in **`playground/.env.example`**. None of these are needed in downstream apps that install the published package. Output is in **`dist/`**.

## Local development

From this repo: `npm link`. In your React app: `npm link @behindthemusictree/assets`. Use a filled **`playground/.env`** (or export the same keys) for **`npm run dev`**—same **`assert-org-url`** gate as **`npm run build`**.

**Playground:** `npm run playground` merges **`playground/.env`** into the environment for the root **`npm run build`**, then starts the Vite dev server. Every key in **`playground/.env.example`** is required for that root build.
