/**
 * Parses JSDoc tags from DBUI component source files.
 *
 * Expected format in component files:
 * ```
 * /**
 *  * @standard Button
 *  * @guideline Use to trigger all click actions
 *  * @guideline Default to Outline for text buttons
 *  * @constraint Avoid icons for Menu button variants
 *  * @constraint No icons for Link variant
 *  * @figma https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv?node-id=477-773
 *  *\/
 * ```
 */

export type ComponentDoc = {
  standard: string
  guidelines: string[]
  constraints: string[]
  figmaUrl?: string
}

/**
 * Parse JSDoc tags from a component source string.
 * Returns null if no @standard tag is found.
 */
export function parseComponentDoc(source: string): ComponentDoc | null {
  const standardMatch = source.match(/@standard\s+(.+)/);
  if (!standardMatch) return null;

  const guidelines: string[] = [];
  const constraints: string[] = [];
  let figmaUrl: string | undefined;

  // Match all @guideline tags
  const guidelineRegex = /@guideline\s+(.+)/g;
  let match: RegExpExecArray | null;
  while ((match = guidelineRegex.exec(source)) !== null) {
    guidelines.push(match[1].trim());
  }

  // Match all @constraint tags
  const constraintRegex = /@constraint\s+(.+)/g;
  while ((match = constraintRegex.exec(source)) !== null) {
    constraints.push(match[1].trim());
  }

  // Match @figma URL
  const figmaMatch = source.match(/@figma\s+(https:\/\/[^\s]+)/);
  if (figmaMatch) {
    figmaUrl = figmaMatch[1];
  }

  return {
    standard: standardMatch[1].trim(),
    guidelines,
    constraints,
    figmaUrl,
  };
}
