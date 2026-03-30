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
- Adding or updating components, tokens, icons, or styles

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
- **New static assets** under `src/icons/<folder>/`: add the corresponding export in `package.json` and extend the build script `cp` so files land in `dist/`.
- **New favicons** under `src/favicons/<project>/`: expose via `"./favicons/*"` export and ensure the build copies them.
- **Components**: follow existing component patterns and import style; prefer minimal, focused diffs.
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
- Update docs under `docs/` if asset naming or logo conventions change

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

Releases are created from the `main` branch. A GitHub Actions workflow automatically publishes to GitHub Packages when a release is created.

1. **Ensure you're on `main`:**

   ```bash
   git checkout main
   git pull origin main
   ```

2. **Update `CHANGELOG.md`:**

   - Move content from `[Unreleased]` to a new version entry with date (e.g., `## [1.1.0] - 2026-04-01`)
   - Leave the `[Unreleased]` section empty for future PRs

3. **Bump the version:**

   ```bash
   npm version patch   # 1.0.0 -> 1.0.1
   # or: npm version minor  # 1.0.0 -> 1.1.0
   # or: npm version major  # 1.0.0 -> 2.0.0
   ```

   This updates `package.json`, creates a commit, and creates a git tag.

4. **Push the commit and tag:**

   ```bash
   git push --follow-tags
   ```

5. **Create a GitHub Release** from the new tag at [github.com/BehindTheMusicTree/organization-assets/releases/new](https://github.com/BehindTheMusicTree/organization-assets/releases/new).

6. The workflow handles the rest: checkout, `npm ci`, `npm run build`, `npm publish` to GitHub Packages.

## License & Attribution

All contributions are made under the project's license.
You retain authorship of your code; the project retains redistribution rights under the same license.
