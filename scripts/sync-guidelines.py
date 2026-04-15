#!/usr/bin/env python3
"""
Sync guidelines.md → individual manifest files.

Usage: python3 scripts/sync-guidelines.py

Reads specs/guidelines.md, parses each component's guidelines and constraints,
then updates the corresponding specs/components/*.manifest.json files.
"""

import json
import os
import re
import sys

GUIDELINES_PATH = "specs/guidelines.md"
MANIFESTS_DIR = "specs/components"


def parse_guidelines_md(path: str) -> dict:
    """Parse guidelines.md into {component_name: {guidelines: [], constraints: []}}"""
    with open(path, "r") as f:
        content = f.read()

    components = {}
    # Split by ## headings
    sections = re.split(r"^## (.+)$", content, flags=re.MULTILINE)

    # sections[0] is the preamble, then alternating: name, body, name, body...
    for i in range(1, len(sections), 2):
        display_name = sections[i].strip()
        body = sections[i + 1] if i + 1 < len(sections) else ""

        # Convert display name back to kebab-case filename
        component_name = display_name.lower().replace(" ", "-")

        guidelines = []
        constraints = []
        current_list = None

        for line in body.strip().split("\n"):
            line = line.strip()
            if line.startswith("**Guidelines:**"):
                current_list = guidelines
            elif line.startswith("**Constraints:**"):
                current_list = constraints
            elif line.startswith("- ") and current_list is not None:
                current_list.append(line[2:])
            elif line == "":
                continue

        components[component_name] = {
            "guidelines": guidelines,
            "constraints": constraints,
        }

    return components


def update_manifests(components: dict):
    """Update each manifest file with parsed guidelines/constraints."""
    updated = 0
    for name, data in components.items():
        manifest_path = os.path.join(MANIFESTS_DIR, f"{name}.manifest.json")
        if not os.path.exists(manifest_path):
            print(f"  SKIP {name} (no manifest file)")
            continue

        with open(manifest_path, "r") as f:
            manifest = json.load(f)

        changed = False
        if manifest.get("guidelines") != data["guidelines"]:
            manifest["guidelines"] = data["guidelines"]
            changed = True
        if manifest.get("constraints") != data["constraints"]:
            manifest["constraints"] = data["constraints"]
            changed = True

        if changed:
            with open(manifest_path, "w") as f:
                json.dump(manifest, f, indent=2)
                f.write("\n")
            print(f"  UPDATED {name}")
            updated += 1
        else:
            print(f"  OK {name} (no changes)")

    return updated


if __name__ == "__main__":
    if not os.path.exists(GUIDELINES_PATH):
        print(f"Error: {GUIDELINES_PATH} not found")
        sys.exit(1)

    print(f"Parsing {GUIDELINES_PATH}...")
    components = parse_guidelines_md(GUIDELINES_PATH)
    print(f"Found {len(components)} components\n")

    print("Syncing to manifests...")
    updated = update_manifests(components)
    print(f"\nDone. {updated} manifests updated.")
