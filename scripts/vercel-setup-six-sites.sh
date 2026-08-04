#!/usr/bin/env bash
# Provision six single-lens Vercel projects from the asaf-portfolio repo.
set -euo pipefail

REPO_URL="https://github.com/Belilus/asaf-portfolio"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

vc() { npx vercel@latest "$@"; }

setup_project() {
  local name="$1"
  local lens="$2"
  local build_cmd="npm run build:${lens}"

  echo ""
  echo "=== ${name} (${lens}) ==="

  if ! vc project inspect "$name" >/dev/null 2>&1; then
    vc project add "$name"
  fi

  vc project update "$name" \
    --framework vite \
    --build-command "$build_cmd" \
    --output-directory dist

  vc env add VITE_PORTFOLIO_LENS production \
    --project "$name" \
    --value "$lens" \
    -y 2>/dev/null || \
  vc env update VITE_PORTFOLIO_LENS production \
    --project "$name" \
    --value "$lens" \
    -y

  printf 'y\n' | vc git connect "$REPO_URL" --project "$name" 2>/dev/null || \
    echo "  (connect $REPO_URL manually in Vercel → ${name} → Git)"

  vc deploy --prod --project "$name" --yes --build-env "VITE_PORTFOLIO_LENS=${lens}"

  echo "  Build: ${build_cmd}"
  echo "  Env:   VITE_PORTFOLIO_LENS=${lens}"
}

setup_project "asaf-portfolio-research" research
setup_project "asaf-portfolio-fullstack" fullstack
setup_project "asaf-portfolio-pm" pm
setup_project "asaf-portfolio-data" data
setup_project "asaf-portfolio-backend" backend
setup_project "asaf-portfolio-frontend" frontend

echo ""
echo "Done."
vc project ls
