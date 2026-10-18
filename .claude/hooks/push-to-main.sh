#!/usr/bin/env bash
# Stop hook: commit any pending site changes and push HEAD to origin/main.
# Pushing to main triggers the GitHub Pages deploy workflow.
set -euo pipefail

cd "${CLAUDE_PROJECT_DIR:-$(git rev-parse --show-toplevel)}"

if [ -n "$(git status --porcelain)" ]; then
  # Cache-bust the stylesheet and script so browsers fetch the new deploy, not a cached copy.
  sed -i -E "s/(styles\.css|script\.js)\?v=[0-9]+/\1?v=$(date +%s)/g" index.html
  git add -A
  git commit -m "Update site" -m "Claude-Session: https://claude.ai/code/session_01XvXTGRRHktpBHCSwz3jeKY"
fi

git push origin HEAD:main
