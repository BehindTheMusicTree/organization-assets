#!/usr/bin/env bash
set -euo pipefail

BUMP="${1:-}"

if [[ -z "$BUMP" ]]; then
  echo "Usage: npm run release -- <patch|minor|major>"
  exit 1
fi

if [[ "$BUMP" != "patch" && "$BUMP" != "minor" && "$BUMP" != "major" ]]; then
  echo "Error: bump type must be patch, minor, or major (got '$BUMP')"
  exit 1
fi

BRANCH=$(git rev-parse --abbrev-ref HEAD)
if [[ "$BRANCH" != "main" ]]; then
  echo "Error: releases must be cut from main (currently on '$BRANCH')"
  exit 1
fi

if [[ -n "$(git status --porcelain)" ]]; then
  echo "Error: working tree is not clean — commit or stash changes first"
  exit 1
fi

OLD_VERSION=$(node -p "require('./package.json').version")
npm version "$BUMP" --no-git-tags-version > /dev/null
NEW_VERSION=$(node -p "require('./package.json').version")
TODAY=$(date +%Y-%m-%d)

sed -i '' "s/^## \[Unreleased\]/## [Unreleased]\n\n## [$NEW_VERSION] - $TODAY/" CHANGELOG.md

git add package.json package-lock.json CHANGELOG.md
git commit -m "chore: release $NEW_VERSION"
git tag "v$NEW_VERSION"
git push --follow-tags

echo ""
echo "Released v$NEW_VERSION ($OLD_VERSION -> $NEW_VERSION)"
echo "Create a GitHub Release from the tag to trigger publishing:"
echo "  https://github.com/BehindTheMusicTree/organization-assets/releases/new?tag=v$NEW_VERSION"
