#!/usr/bin/env bash
# Stop hook: commit any pending site changes and push HEAD to origin/main.
# Pushing to main triggers the GitHub Pages deploy workflow.
set -euo pipefail

cd "${CLAUDE_PROJECT_DIR:-$(git rev-parse --show-toplevel)}"

if [ -n "$(git status --porcelain)" ]; then
  git add -A
  git commit -m "Update site" -m "Claude-Session: https://claude.ai/code/session_01XvXTGRRHktpBHCSwz3jeKY"
fi

git push origin HEAD:main
