#!/bin/bash
# Usage: ./scripts/check-component.sh <component-name>
# Example: ./scripts/check-component.sh alert
#
# Lists every file that references a DBUI component — source, consumers,
# Code Connect, specs, docs. Run this before AND after any component change
# to make sure nothing is missed.

set -euo pipefail

NAME="${1:?Usage: check-component.sh <component-name> (e.g. alert, button, radio-group)}"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"

# Derive variations of the name
KEBAB="$NAME"                                                    # alert-dialog
PASCAL=$(echo "$KEBAB" | perl -pe 's/(^|-)(\w)/uc($2)/ge')       # AlertDialog
FILE="$KEBAB.tsx"                                                # alert-dialog.tsx

echo "════════════════════════════════════════════════════════"
echo "  DBUI Component Check: $PASCAL ($KEBAB)"
echo "════════════════════════════════════════════════════════"
echo ""

# 1. Source file
echo "1. SOURCE"
SRC="$ROOT/packages/dbui/src/components/ui/$FILE"
if [ -f "$SRC" ]; then
  EXPORTS=$(grep -c '^export\|^function ' "$SRC" 2>/dev/null || echo 0)
  echo "   ✓ $SRC ($EXPORTS exports/functions)"
else
  echo "   ✗ NOT FOUND: $SRC"
fi
echo ""

# 2. Code Connect
echo "2. CODE CONNECT"
CC=$(find "$ROOT/packages/dbui/src/figma" -iname "*${KEBAB}*" -o -iname "*${PASCAL}*" 2>/dev/null | head -5)
if [ -n "$CC" ]; then
  echo "$CC" | while read f; do echo "   ✓ $f"; done
else
  echo "   ✗ No Code Connect file found"
fi
echo ""

# 3. Portal consumers (components page, registry, stories, app pages)
echo "3. PORTAL CONSUMERS"
grep -rn "from.*[\"']dbui/components/ui/$KEBAB[\"']" "$ROOT/apps/portal/src/" 2>/dev/null | while read line; do
  echo "   → $line"
done
# Also check for the Pascal name in JSX
grep -rln "<${PASCAL}[ />]" "$ROOT/apps/portal/src/" 2>/dev/null | while read f; do
  USES=$(grep -c "<${PASCAL}[ />]" "$f")
  echo "   → $f ($USES JSX usages)"
done
echo ""

# 4. Internal cross-imports (other DBUI components importing this one)
echo "4. INTERNAL CROSS-IMPORTS (other DBUI components)"
grep -rn "from.*[\"'].*/$KEBAB[\"']" "$ROOT/packages/dbui/src/components/ui/" 2>/dev/null | grep -v "$FILE:" | while read line; do
  echo "   → $line"
done
echo ""

# 5. Specs
echo "5. SPECS & DOCS"
SPEC="$ROOT/specs/components/$KEBAB.spec.json"
if [ -f "$SPEC" ]; then
  echo "   ✓ $SPEC"
else
  echo "   · No spec file (specs/components/$KEBAB.spec.json)"
fi
# Check global-rules.json
if grep -q "\"$PASCAL\"" "$ROOT/specs/global-rules.json" 2>/dev/null; then
  echo "   ✓ Referenced in global-rules.json"
else
  echo "   · Not in global-rules.json componentSpecs"
fi
# Check llms.txt
if grep -qi "$PASCAL\|$KEBAB" "$ROOT/packages/dbui/llms.txt" 2>/dev/null; then
  MENTIONS=$(grep -ci "$PASCAL\|$KEBAB" "$ROOT/packages/dbui/llms.txt")
  echo "   ✓ llms.txt ($MENTIONS mentions)"
else
  echo "   · Not mentioned in llms.txt"
fi
# Check CLAUDE.md
if grep -qi "$PASCAL\|$KEBAB" "$ROOT/CLAUDE.md" 2>/dev/null; then
  echo "   ✓ Referenced in CLAUDE.md"
else
  echo "   · Not in CLAUDE.md"
fi
echo ""

# 6. Spreadsheet reminder
echo "6. SPREADSHEET"
echo "   Remember to update DBUI Components sheet columns J-M"
echo "   Spreadsheet: 1grepuuphDcysb5VS8yIV-5_C3SEWjT_h9_6t3Rywq8g"
echo ""

# Summary
echo "════════════════════════════════════════════════════════"
echo "  FILES TO UPDATE when changing $PASCAL:"
echo "════════════════════════════════════════════════════════"
echo "  □ packages/dbui/src/components/ui/$FILE"
echo "  □ Code Connect file (if props/exports changed)"
ALL_CONSUMERS=$(grep -rln "from.*[\"']dbui/components/ui/$KEBAB[\"']" "$ROOT/apps/portal/src/" 2>/dev/null; grep -rln "<${PASCAL}[ />]" "$ROOT/apps/portal/src/" 2>/dev/null)
echo "$ALL_CONSUMERS" | sort -u | while read f; do
  echo "  □ ${f#$ROOT/}"
done
echo "  □ specs/global-rules.json (if rules changed)"
echo "  □ packages/dbui/llms.txt (if API changed)"
echo "  □ Spreadsheet row (mark columns J-M)"
echo ""
