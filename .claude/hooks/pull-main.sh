#!/usr/bin/env bash
# UserPromptSubmit hook: fast-forward the local checkout to origin/main before each
# change request, so parallel Claude instances start from the latest shared state.
# Never blocks the prompt: on any problem it reports the situation and exits 0.
set -uo pipefail

cd "${CLAUDE_PROJECT_DIR:-$(git rev-parse --show-toplevel)}" || exit 0

if ! git fetch origin main --quiet; then
  echo "pull-main: fetch of origin/main failed; continuing with local state."
  exit 0
fi

behind=$(git rev-list --count HEAD..origin/main)
if [ "$behind" -eq 0 ]; then
  echo "pull-main: already up to date with origin/main."
  exit 0
fi

# --ff-only refuses to create merge commits or rewrite history; it only moves HEAD forward.
if git merge --ff-only --quiet origin/main; then
  echo "pull-main: fast-forwarded $behind commit(s) from origin/main to $(git rev-parse --short HEAD)."
else
  echo "pull-main: could not fast-forward to origin/main (local changes or diverged history). Resolve before editing."
fi
exit 0
