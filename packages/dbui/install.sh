#!/usr/bin/env bash
# DBUI installer — run from your project root.
# Usage: curl -fsSL https://raw.githubusercontent.com/muditmittal/dbui/main/packages/dbui/install.sh | bash
#
# On Databricks-managed machines, point npm at the sanctioned mirror first:
#   echo 'registry=https://npm-proxy.dev.databricks.com' >> .npmrc
# DBUI itself still needs no npm install.

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
if [ -f ./CLAUDE.md ]; then
  echo "⚠ CLAUDE.md already exists — leave it alone. Append the DBUI block from ./dbui/install.md if needed."
else
  cp ./dbui/CLAUDE.md ./CLAUDE.md
fi

# 3. Install skills (Cursor)
mkdir -p .cursor/skills
cp -r ./dbui/skills/* .cursor/skills/

# 4. Add CSS import if not already present.
# Path is relative to the CSS file: src/*.css → ../dbui/..., root CSS → ./dbui/...
CSS_FILE=""
for f in src/index.css src/app/globals.css src/globals.css app/globals.css styles/globals.css index.css; do
  [ -f "$f" ] && CSS_FILE="$f" && break
done
if [ -n "$CSS_FILE" ]; then
  case "$CSS_FILE" in
    src/*|app/*|styles/*) TOKEN_IMPORT='@import "../dbui/src/tokens/globals.css";' ;;
    *) TOKEN_IMPORT='@import "./dbui/src/tokens/globals.css";' ;;
  esac
  if ! grep -q "dbui/src/tokens/globals.css" "$CSS_FILE" 2>/dev/null; then
    # The token import must follow `@import "tailwindcss"`, so it is inserted
    # after that line when present rather than prepended to the file.
    if grep -q '@import "tailwindcss"' "$CSS_FILE" 2>/dev/null; then
      awk -v ins="$TOKEN_IMPORT" '
        { print }
        !done && /@import "tailwindcss"/ { print ins; done = 1 }
      ' "$CSS_FILE" > "$CSS_FILE.tmp" && mv "$CSS_FILE.tmp" "$CSS_FILE"
    else
      printf '%s\n\n%s\n' "$TOKEN_IMPORT" "$(cat "$CSS_FILE")" > "$CSS_FILE"
    fi
    echo "✓ Added token import to $CSS_FILE"
  fi
fi

# 5. Add tsconfig paths — prefer the file that owns app compilerOptions
TS_TARGET=""
for f in tsconfig.app.json tsconfig.json; do
  [ -f "$f" ] && TS_TARGET="$f" && break
done
if [ -n "$TS_TARGET" ]; then
  if ! grep -q "dbui/vendor/tsconfig-paths\|dbui/vendor/reselect" "$TS_TARGET" 2>/dev/null; then
    if ! grep -q '"compilerOptions"' "$TS_TARGET" 2>/dev/null; then
      echo "⚠ $TS_TARGET owns no compilerOptions. Merge paths from ./dbui/vendor/tsconfig-paths.json into the tsconfig that does."
    else
      node -e "
        const fs = require('fs');
        const path = require('path');
        const file = process.argv[1];
        const raw = fs.readFileSync(file, 'utf8');
        const clean = raw.replace(/\\/\\*[\\s\\S]*?\\*\\//g, '').replace(/\\/\\/.*$/gm, '');
        const cfg = JSON.parse(clean);
        const vendor = JSON.parse(fs.readFileSync('./dbui/vendor/tsconfig-paths.json', 'utf8'));
        cfg.compilerOptions = cfg.compilerOptions || {};
        cfg.compilerOptions.paths = Object.assign({}, cfg.compilerOptions.paths || {}, vendor.compilerOptions.paths);
        fs.writeFileSync(file, JSON.stringify(cfg, null, 2) + '\n');
      " "$TS_TARGET" 2>/dev/null && echo "✓ Merged DBUI paths into $TS_TARGET" || echo "⚠ Could not auto-edit $TS_TARGET. Merge paths from ./dbui/vendor/tsconfig-paths.json"
    fi
  fi
fi

echo ""
echo "✓ DBUI installed. No npm install needed for DBUI."
echo ""
echo "  Components: ./dbui/src/components/ui/"
echo "  Icons:      ./dbui/src/components/icons/"
echo "  Tokens:     ./dbui/src/tokens/globals.css"
echo "  Skills:     .cursor/skills/dbui-*"
echo "  Rules:      ./CLAUDE.md"
echo ""
echo "If this is a Vite project, add tailwindcss() and dbuiAliases to vite.config.ts —"
echo "see ./dbui/install.md step 2."
echo ""
echo "Start with:"
echo ""
echo "  import { Base } from \"dbui-shells\""
echo ""
echo "  <Base defaultActive=\"catalog\">"
echo "    {/* your content */}"
echo "  </Base>"
echo ""
