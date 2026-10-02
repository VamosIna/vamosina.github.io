#!/usr/bin/env bash
#
# Manual deploy to GitHub Pages (gh-pages branch).
#
# Usage:
#   ./deploy.sh
#
# Requires: a git remote named "origin" that points to your GitHub repo.
# Set it once with:  git remote add origin git@github.com:<user>/<repo>.git

set -euo pipefail

REMOTE_URL="$(git remote get-url origin 2>/dev/null || true)"
if [ -z "$REMOTE_URL" ]; then
  echo "✗ No 'origin' remote found."
  echo "  Add one first, e.g.:  git remote add origin git@github.com:<user>/<repo>.git"
  exit 1
fi

REPO_NAME="$(basename -s .git "$REMOTE_URL")"

# A user site (<user>.github.io) is served from the root; project sites
# are served from /<repo>, so Next needs a matching basePath.
case "$REPO_NAME" in
  *.github.io) BASE_PATH="" ;;
  *)           BASE_PATH="/$REPO_NAME" ;;
esac

echo "▸ Repo:      $REPO_NAME"
echo "▸ basePath:  ${BASE_PATH:-<none>}"

echo "▸ Building static export…"
rm -rf out
NEXT_PUBLIC_BASE_PATH="$BASE_PATH" npm run build

touch out/.nojekyll

echo "▸ Pushing out/ to 'gh-pages'…"
GIT_NAME="$(git config user.name  || echo deploy)"
GIT_EMAIL="$(git config user.email || echo deploy@users.noreply.github.com)"

(
  cd out
  git init -q
  git checkout -q -b gh-pages
  git add -A
  git -c user.name="$GIT_NAME" -c user.email="$GIT_EMAIL" \
    commit -qm "Deploy $(date -u +%Y-%m-%dT%H:%M:%SZ)"
  git push -f "$REMOTE_URL" gh-pages
)

rm -rf out/.git

OWNER="$(echo "$REMOTE_URL" | sed -E 's#.*[:/]([^/]+)/[^/]+$#\1#')"
echo
echo "✓ Deployed."
echo "  URL: https://${OWNER}.github.io/${REPO_NAME}/"
echo
echo "  First time only: repo → Settings → Pages → Source = 'Deploy from a branch'"
echo "  → branch 'gh-pages' / '/ (root)' → Save."
