#!/bin/bash
# Publish DBUI packages to public npm as @muditmittal/dbui and @muditmittal/dbui-shells
#
# Prerequisites:
# 1. npm login (one-time: run from personal wifi, not Databricks VPN)
# 2. Run from repo root: ./scripts/publish.sh
#
# This script temporarily renames packages for npm, publishes, then reverts.

set -e

echo "🔧 Building dbui..."
cd packages/dbui
npx tsup

echo ""
echo "📦 Publishing @muditmittal/dbui..."

# Temporarily set scoped name + public access + source exports
node -e "
const pkg = require('./package.json');
pkg.name = '@muditmittal/dbui';
pkg.publishConfig = { access: 'public' };
pkg.files = ['src', 'llms.txt', 'README.md'];
pkg.main = './src/index.ts';
pkg.types = './src/index.ts';
delete pkg.module;
require('fs').writeFileSync('./package.json', JSON.stringify(pkg, null, 2));
"

npm publish --access public

# Revert
git checkout -- package.json
echo "✅ @muditmittal/dbui published"

echo ""
echo "📦 Publishing @muditmittal/dbui-shells..."
cd ../dbui-shells

# Temporarily set scoped name + dependency on scoped dbui
node -e "
const pkg = require('./package.json');
pkg.name = '@muditmittal/dbui-shells';
pkg.version = pkg.version || '0.1.0';
pkg.publishConfig = { access: 'public' };
pkg.files = ['src', 'README.md'];
pkg.license = 'MIT';
pkg.dependencies = { '@muditmittal/dbui': '^' + require('../dbui/package.json').version };
pkg.repository = { type: 'git', url: 'https://github.com/muditmittal/dbui.git', directory: 'packages/dbui-shells' };
require('fs').writeFileSync('./package.json', JSON.stringify(pkg, null, 2));
"

npm publish --access public

# Revert
git checkout -- package.json
echo "✅ @muditmittal/dbui-shells published"

echo ""
echo "🎉 Done! Databricks users can now install:"
echo ""
echo "  yarn add @muditmittal/dbui-shells"
echo "  # or just components:"
echo "  yarn add @muditmittal/dbui"
