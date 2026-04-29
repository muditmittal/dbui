#!/usr/bin/env bash
# DBUI installer — run from your project root.
# Usage: curl -fsSL https://raw.githubusercontent.com/muditmittal/dbui/main/packages/dbui/install.sh | bash

set -euo pipefail

echo ""
echo "Installing DBUI..."
echo ""

# 1. Clone or pull
if [ -d "$HOME/dbui/.git" ]; then
  (cd "$HOME/dbui" && git pull --ff-only 2>/dev/null) || true
else
  git clone https://github.com/muditmittal/dbui.git "$HOME/dbui"
fi

# 2. Copy into project
cp -r "$HOME/dbui/packages/dbui" ./dbui
cp -r "$HOME/dbui/packages/dbui-shells" ./dbui-shells
cp ./dbui/CLAUDE.md ./CLAUDE.md

# 3. Install skills (Cursor)
mkdir -p .cursor/skills
cp -r ./dbui/skills/* .cursor/skills/

# 4. Add CSS import if not already present
CSS_FILE=""
for f in src/index.css src/app/globals.css src/globals.css app/globals.css styles/globals.css index.css; do
  [ -f "$f" ] && CSS_FILE="$f" && break
done
if [ -n "$CSS_FILE" ]; then
  if ! grep -q "dbui/src/tokens/globals.css" "$CSS_FILE" 2>/dev/null; then
    printf '@import "./dbui/src/tokens/globals.css";\n\n%s' "$(cat "$CSS_FILE")" > "$CSS_FILE"
    echo "✓ Added token import to $CSS_FILE"
  fi
fi

# 5. Add tsconfig paths
if [ -f "tsconfig.json" ]; then
  if ! grep -q "dbui/vendor/tsconfig-paths" tsconfig.json 2>/dev/null; then
    if grep -q '"extends"' tsconfig.json 2>/dev/null; then
      echo "⚠ tsconfig.json already has 'extends'. Merge paths from ./dbui/vendor/tsconfig-paths.json manually."
    else
      node -e "
        const fs = require('fs');
        const cfg = JSON.parse(fs.readFileSync('tsconfig.json', 'utf8'));
        cfg.extends = './dbui/vendor/tsconfig-paths.json';
        fs.writeFileSync('tsconfig.json', JSON.stringify(cfg, null, 2) + '\n');
      " 2>/dev/null && echo "✓ Added extends to tsconfig.json" || echo "⚠ Could not auto-edit tsconfig.json. Add: \"extends\": \"./dbui/vendor/tsconfig-paths.json\""
    fi
  fi
fi

echo ""
echo "✓ DBUI installed. No npm install needed."
echo ""
echo "  Components: ./dbui/src/components/ui/"
echo "  Icons:      ./dbui/src/components/icons/"
echo "  Tokens:     ./dbui/src/tokens/globals.css"
echo "  Skills:     .cursor/skills/dbui-*.md"
echo "  Rules:      ./CLAUDE.md"
echo ""
echo "Start with:"
echo ""
echo "  import { Base } from \"dbui-shells\""
echo ""
echo "  <Base defaultActive=\"catalog\">"
echo "    {/* your content */}"
echo "  </Base>"
echo ""
