#!/usr/bin/env bash
# Backward-compatible wrapper — provisions all six lens sites.
exec "$(dirname "$0")/vercel-setup-six-sites.sh" "$@"
