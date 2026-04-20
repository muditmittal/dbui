#!/usr/bin/env bash
# sync-icons.sh — Sync DBUI icon SVGs from Universe codebase
# Usage: ./scripts/sync-icons.sh [--dry-run]
#
# Extracts SVG content from Universe icons via arca ssh, then regenerates
# DBUI icon .tsx files with Universe SVG paths + preserved metadata.
# Repeatable — safe to run whenever Universe icons update.

set -euo pipefail

ICONS_DIR="packages/dbui/src/components/icons"
RAW_FILE="/tmp/universe-icons-raw.txt"
DRY_RUN=false

if [[ "${1:-}" == "--dry-run" ]]; then
  DRY_RUN=true
  echo "=== DRY RUN — no files will be modified ==="
fi

# ── Step 1: Extract Universe icons ──
echo "Extracting Universe icons via arca ssh..."
arca ssh -- 'for f in /home/mudit.mittal/universe/design-system/src/design-system/Icon/__generated/icons/*.tsx; do
  name=$(basename "$f" .tsx | sed "s/Icon$//")
  content=$(sed -n "/<svg/,/<\/svg>/p" "$f" | sed "1d;\$d")
  viewbox=$(grep -o "viewBox=\"[^\"]*\"" "$f" | head -1 | sed "s/viewBox=\"//;s/\"//")
  echo "===ICON_START==="
  echo "NAME:$name"
  echo "VIEWBOX:$viewbox"
  echo "CONTENT_START"
  echo "$content"
  echo "CONTENT_END"
  echo "===ICON_END==="
done' > "$RAW_FILE"

TOTAL=$(grep -c '===ICON_START===' "$RAW_FILE")
echo "Extracted $TOTAL Universe icons"

echo ""
echo "Now run the Node.js generator to rebuild DBUI icons:"
echo "  node scripts/generate-icons.mjs $([[ $DRY_RUN == true ]] && echo '--dry-run')"
