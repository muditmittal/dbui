"use client"

/**
 * Gallery demos that own state.
 *
 * `gallery-demos.tsx` is a server module, so it can compose client components but
 * cannot hold a `useState` or pass a handler. A demo whose whole point is a state
 * transition lives here instead.
 */

import * as React from "react"

import { Checkbox } from "dbui/components/ui/checkbox"

/**
 * `indeterminate` is a controlled prop: Base UI never clears it, and
 * `data-indeterminate` wins over `data-checked` in the styling. Passed as a fixed
 * prop the box reads as broken — the click lands and does flip `checked`, but
 * nothing can change what you see.
 *
 * A partially selected parent resolves to all-selected when clicked, so that is the
 * transition this demonstrates.
 */
export function CheckboxIndeterminateDemo() {
  const [checked, setChecked] = React.useState<boolean | "mixed">("mixed")

  return (
    <Checkbox
      checked={checked === true}
      indeterminate={checked === "mixed"}
      onCheckedChange={(next) => setChecked(next)}
    />
  )
}
