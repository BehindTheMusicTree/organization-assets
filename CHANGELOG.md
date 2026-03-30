# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## Changelog Best Practices

### General Principles

- Changelogs are for humans, not machines.
- Include an entry for every version, with the latest first.
- Group similar changes under: Added, Changed, Improved, Deprecated, Removed, Fixed, Documentation, Performance, CI.
- Use an "Unreleased" section for upcoming changes.
- Follow Semantic Versioning where possible.
- Use ISO 8601 date format: YYYY-MM-DD.
- Avoid dumping raw git logs; summarize notable changes clearly.

### Guidelines for Contributors

All contributors (including maintainers) should update `CHANGELOG.md` when creating PRs:

1. **Add entries to the `[Unreleased]` section** - Add your changes under the appropriate category (Added, Changed, Improved, Deprecated, Removed, Fixed, Documentation, Performance, CI)
2. **Follow the changelog format** - See examples below
3. **Group related changes** - Similar changes should be grouped together
4. **Be descriptive** - Write clear, user-focused descriptions of what changed

**Example:**

```markdown
## [Unreleased]

### Added

- **New Component**: Added `Card` component with variants for outlined and elevated styles

### Fixed

- **Token Export**: Fixed missing CSS custom property for `--color-surface`
```

**Note:** During releases, maintainers will move entries from `[Unreleased]` to a versioned section (e.g., `## [1.1.0] - 2026-04-01`).

## [Unreleased]

### Added

- **GitHub Packages Publishing**: Added GitHub Actions workflow to automatically publish to GitHub Packages on release
- **Package Identity**: Set package name to `@behindthemusictree/assets` with `publishConfig` pointing to GitHub Packages registry

## [1.0.0] - 2026-03-30

### Added

- **Components**: Reusable React components (e.g. `Button`)
- **Design Tokens**: Colors, spacing, and radius as CSS custom properties and JS exports
- **Icons**: Organization and project logo assets under `src/icons/`
- **Favicons**: Per-project favicon bundles under `src/favicons/` (behind-the-music-tree, grow-the-music-tree)
- **Styles**: Global resets and shared CSS importing design tokens
- **Hooks**: Shared React hooks
- **Utils**: Helpers and constants
- **Build Pipeline**: tsup compilation (ESM + CJS + `.d.ts`) with post-build copy for static assets
