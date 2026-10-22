#!/usr/bin/env bash
cd "$(dirname "$0")"
echo "============================================================================"
echo "  🚀 STARTING VISUAL UI STUDIO PRO v3.0..."
echo "============================================================================"
if command -v node >/dev/null 2>&1; then
  node ./server.js --open "$1"
else
  echo "[!] Node.js not found. Opening standalone studio in browser..."
  open ./public/index.html 2>/dev/null || xdg-open ./public/index.html 2>/dev/null
fi
