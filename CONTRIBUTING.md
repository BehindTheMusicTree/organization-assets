# Contributing Guidelines

Thank you for your interest in contributing!
This project is currently maintained by a solo developer, but contributions, suggestions, and improvements are welcome.

## Table of Contents

- [Contributors vs Maintainers](#contributors-vs-maintainers)
  - [Roles Overview](#roles-overview)
  - [Infrastructure & Automation Permissions](#infrastructure--automation-permissions)
- [Development Workflow](#development-workflow)
  - [0. Fork & Clone](#0-fork--clone)
  - [1. Environment Setup](#1-environment-setup)
    - [Installing the package in an app](#installing-the-package-in-an-app)
    - [Component and asset preview (playground)](#component-and-asset-preview-playground)
  - [2. Branching](#2-branching)
  - [3. Developing](#3-developing)
  - [4. Committing](#4-committing)
  - [5. Pull Request Process](#5-pull-request-process)
    - [5.1. Pre-PR Checklist](#51-pre-pr-checklist)
    - [5.2. Opening a Pull Request](#52-opening-a-pull-request)
  - [6. Releasing _(For Maintainers)_](#6-releasing-for-maintainers)
- [License & Attribution](#license--attribution)

## Contributors vs Maintainers

### Roles Overview

**Contributors**

Anyone can be a contributor by:

- Submitting bug reports or feature requests via GitHub Issues
- Proposing code changes through Pull Requests
- Improving documentation
- Adding or updating components, tokens, brand assets, or styles

**Maintainers**

The maintainer(s) are responsible for:

- Reviewing and merging Pull Requests
- Managing releases and versioning
- Ensuring code quality and project direction
- Maintaining the project's infrastructure
- Moving "Unreleased" changelog entries to versioned sections during releases

**Important:** Even maintainers must go through Pull Requests. No direct commits to `main` are allowed.

### Infrastructure & Automation Permissions

**Repository automation policies (maintainer-only):**

- Publishing workflows (`.github/workflows/publish.yml`) — handles package publishing to GitHub Packages
- Other automation workflows that affect repository management

**What contributors can do:**

- Suggest improvements or report issues via GitHub Issues
- Propose changes to any source code, components, tokens, or documentation via PRs

## Development Workflow

### 0. Fork & Clone

**For contributors:**

1. Fork the repository on GitHub
2. Clone your fork:

   ```bash
   git clone https://github.com/YOUR-USERNAME/organization-assets.git
   cd organization-assets
   ```

**For maintainers:**

Clone the main repository directly:

```bash
git clone https://github.com/BehindTheMusicTree/organization-assets.git
cd organization-assets
```

### 1. Environment Setup

Ensure you have:

- **Node.js 20+**
- **npm**

Install dependencies:

```bash
npm install
```

Build the package:

```bash
npm run build
```

For local development with watch mode:

```bash
npm run dev
```

To test in a consuming app locally, use `npm link`:

```bash
# In this repo
npm link

# In your React app
npm link @behindthemusictree/assets
```

#### Installing the package in an app

To depend on a **published** version from GitHub Packages (instead of `npm link`), configure npm scope + authentication, then install. Full steps: **[README — Install](README.md#install)**.

#### Component and asset preview (playground)

The `playground/` app is a dev-only Vite catalog of published components and files under `dist/` (brand, banners, favicons). It is not part of the npm package `files` list.

One-time setup after clone (or when `playground/package.json` dependencies change):

```bash
npm run playground:install
```

Copy `playground/.env.example` to `playground/.env` and set **`NEXT_PUBLIC_DOMAIN_NAME`** (same value you use for GitHub **`DOMAIN_NAME`**). The playground Vite config requires it; **`npm run dev`** / **`build`** in `playground/` fail if it is missing. The catalog uses **`parseOrgSiteHref(import.meta.env.NEXT_PUBLIC_DOMAIN_NAME)`** (not **`getOrgSiteHref()`**) so env is injected into app source; if the UI stays blank after changing env, remove **`playground/node_modules/.vite`** and restart the dev server.

Run a build and start the dev server (default port **5174**):

```bash
npm run playground
```

To run only the Vite dev server (faster when `dist/` is already current from a recent `npm run build`):

```bash
npm run playground:dev
```

Refresh after `npm run build` at the repo root so new static assets appear.

### 2. Branching

#### Main Branch (`main`)

- The stable, always-deployable branch
- All changes must go through Pull Requests
- Releases are tagged from `main`

#### Feature Branches (`feature/<name>`)

- Create one for each new feature, component, or bug fix
- Include issue numbers when applicable: `feature/123-add-card-component`
- Merge into `main` via Pull Request when complete

#### Chore Branches (`chore/<name>`)

- For maintenance, infrastructure, and configuration work
- Examples: dependency updates, CI/CD changes, documentation infrastructure

#### Hotfix Branches (`hotfix/<name>`) _(For Maintainers)_

- For urgent bug fixes on published versions

### 3. Developing

- **New TS entry points**: add or extend an entry in `tsup.config.ts` and matching `exports` in `package.json`.
- **New static brand assets** under `src/brand/<folder>/`: add the corresponding `./brand/<folder>/*` export in `package.json` and extend the build script `cp` so files land in `dist/brand/`.
- **New favicons** under `src/favicons/<project>/`: expose via `"./favicons/*"` export and ensure the build copies them.
- **Banner assets** under `src/banners/<project-slug>/`: add files in a project subfolder (not loose under `src/banners/`). `"./banners/*"` and the build’s `dist/banners/` copy pick up new folders automatically; run a full build after adding binaries.
- **Components**: follow existing component patterns and import style; prefer minimal, focused diffs.
- **Playground (required)**: any **new exported component** or **published static asset** must be visible in the playground in the same change (before merge). Add a demo in [`playground/src/App.tsx`](playground/src/App.tsx) for components. For assets, run a full [`npm run build`](README.md#build) so files land under `dist/`; the catalog globs in [`playground/src/distAssetGlobs.ts`](playground/src/distAssetGlobs.ts) list matching files under `dist/brand`, `dist/banners`, and `dist/favicons`. Extend those globs or add an explicit preview import if needed. See [Component and asset preview (playground)](#component-and-asset-preview-playground).
- **TypeScript**: `tsconfig.json` uses `"moduleResolution": "bundler"` — keep it compatible with tsup.

After structural changes, run a full build to verify:

```bash
npm run build
```

### 4. Committing

We follow a structured commit format inspired by [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/):

- Format: `<type>(<scope>): <summary>`
- Types: `feat`, `fix`, `refactor`, `docs`, `chore`, `perf`, `style`, `ci`
- Use imperative mood ("Add…", "Fix…", "Update…")

**Examples:**

```
feat(components): add Card component with outlined variant
fix(tokens): export missing surface color token
chore: update tsup to v9
docs: add favicon bundle documentation
```

### 5. Pull Request Process

#### 5.1. Pre-PR Checklist

Before submitting a Pull Request:

**1. Code Quality**

- Follow existing component and import style
- TypeScript compiles without errors

**2. Build**

- `npm run build` completes successfully
- New exports are accessible from the built package

**3. Documentation**

- Update README if adding new features or changing behavior
- Update `CHANGELOG.md` with your changes in the `[Unreleased]` section (see [Changelog Best Practices](CHANGELOG.md#changelog-best-practices))
- Update documentation when asset conventions change: global guides in `docs/` and colocated specs in `src/*/README.md` (see [`docs/README.md`](docs/README.md)). Any **multi-section** Markdown file in the repo should include a **Table of contents** linking each `##` section ([`CHANGELOG.md`](CHANGELOG.md) and one-section stubs exempt); see [`.cursor/rules/static-assets-and-docs.mdc`](.cursor/rules/static-assets-and-docs.mdc).

**4. Git Hygiene**

- Commit messages follow the convention above
- Branch is up to date with `main`
- No accidental commits (large files, secrets, personal configs)

#### 5.2. Opening a Pull Request

**PR Title Naming Convention:**

```
<type>(<optional-scope>): <short imperative description>
```

**Examples:**

- `feat(components): add Card component with outlined variant`
- `fix(tokens): export missing surface color token`
- `docs: update contributing guide`
- `chore: update tsup to v9`

**PR Description should include:**

- Clear description of changes
- Reference related issues (e.g., "Fixes #123")
- Note any breaking changes

### 6. Releasing _(For Maintainers)_

Releases are created from the `main` branch. A GitHub Actions workflow publishes to GitHub Packages when a version tag is pushed and **creates a GitHub Release** for that tag (generated notes, for watcher notifications).

Run the release script from `main` with a clean working tree:

```bash
npm run release -- patch   # 1.0.0 -> 1.0.1
npm run release -- minor   # 1.0.0 -> 1.1.0
npm run release -- major   # 1.0.0 -> 2.0.0
```

The script (`scripts/release.sh`) does the following in one shot:

1. Validates you're on `main` with a clean working tree
2. Bumps the version in `package.json`
3. Stamps `CHANGELOG.md` — replaces `[Unreleased]` with the new version and today's date, keeping an empty `[Unreleased]` section for future PRs
4. Commits `package.json`, `package-lock.json`, and `CHANGELOG.md`
5. Creates a git tag `v<version>`
6. Pushes the commit and tag

Publishing to GitHub Packages and creating the GitHub Release start automatically once the tag is pushed.

## License & Attribution

All contributions are made under the project's license.
You retain authorship of your code; the project retains redistribution rights under the same license.
