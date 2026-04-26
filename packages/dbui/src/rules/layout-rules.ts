/**
 * DBUI Global Layout Rules
 *
 * These are the spacing and layout defaults for the Databricks platform.
 * They apply everywhere regardless of which component is being used.
 *
 * LLMs: when building a page or layout, use these as safe defaults.
 * Devs: consult these before adding arbitrary spacing values.
 */

export const layoutRules = {
  /**
   * Spacing rhythm — three tiers of visual hierarchy
   */
  spacing: {
    /**
     * 16px (spacing-md) — DEFAULT gap between distinct sections.
     *
     * Use between:
     * - Page header and control bar
     * - Control bar and table
     * - Table and pagination row
     * - Sidebar sections
     * - Form field groups
     *
     * This is the safe default. When in doubt, use 16px.
     */
    betweenSections: "gap-4", // 16px

    /**
     * 8px (spacing-sm) — DEFAULT gap within a component group.
     *
     * Use between:
     * - Items inside a title bar
     * - Buttons inside a control bar
     * - Items inside a table cell
     * - Elements inside a card header
     * - Icon and label inside any component
     *
     * This is the internal rhythm of any single "unit" of UI.
     */
    withinComponent: "gap-2", // 8px

    /**
     * 24px (spacing-lg) — Visual breathing room between dense blocks.
     *
     * Use between:
     * - Dense information sections in a sidebar detail panel
     * - Bounded card sections on the main page
     * - Major content zones that need visual separation
     *
     * Less common. Only when 16px doesn't create enough separation.
     */
    betweenDenseBlocks: "gap-6", // 24px

    /**
     * 1px, 2px, 4px — ONLY inside controls.
     *
     * These micro-spacings are for:
     * - Padding inside form controls (py-0, py-0.5)
     * - Gap between icon and text inside a button (gap-1 for sm, gap-2 for md)
     * - Segment control item padding
     *
     * Never use these for page layout or between components.
     */
    insideControls: "gap-0.5 | gap-1 | px-1 | py-0.5",
  },

  /**
   * Page padding — content surface insets
   */
  pagePadding: {
    /**
     * Standard page content padding.
     * Page header: px-4 py-3 (horizontal 16px, vertical 12px)
     * Page body: px-6 py-4 (horizontal 24px, vertical 16px)
     */
    header: "px-4 py-3",
    body: "px-6 py-4",
  },

  /**
   * Platform shell — fixed layout dimensions
   */
  shell: {
    headerHeight: "h-12",     // 48px
    navbarWidth: "w-[180px]", // 180px fixed
    contentRadius: "rounded-[8px]",
    contentMargin: "pb-2 pr-2", // 8px bottom and right
    shellBg: "bg-muted",
    contentBg: "bg-background",
  },

  /**
   * Common layout patterns
   */
  patterns: {
    /** Page header → Control bar → Content → Pagination */
    listPage: {
      headerToControls: "gap-4", // 16px
      controlsToTable: "gap-4",  // 16px
      tableToPagination: "gap-4", // 16px
    },

    /** Detail page with sidebar */
    detailPage: {
      mainToSidebar: "gap-6",     // 24px
      sidebarSections: "gap-6",   // 24px between info blocks
      sidebarWithin: "gap-2",     // 8px within each block
    },

    /** Form layout */
    form: {
      fieldGroups: "gap-4",       // 16px between field groups
      labelToInput: "gap-1.5",    // 6px between label and input
      inputToHelper: "gap-1",     // 4px between input and helper text
    },
  },
} as const

/**
 * Icon Selection Rules
 *
 * Every icon in packages/dbui/src/components/icons/ has a JSDoc tag:
 *   /** use:<category> <concept> | <product_area> | <synonyms> *​/
 *
 * Categories:
 *   use:object    — Databricks product concept (Notebook, Table, Experiment)
 *                   Use in: nav items, table cells, cards, tree nodes
 *
 *   use:action    — Verb the user performs (delete, copy, filter)
 *                   Use in: buttons, toolbar actions, menu items
 *
 *   use:indicator — Status or state (running, success, warning)
 *                   Use in: status badges, table status cells, alerts
 *
 *   use:component — Built into control chrome (chevron, check, close)
 *                   Use in: only inside the designated control
 *
 * HOW TO FIND ICONS:
 *   1. Determine category (object? action? status? control chrome?)
 *   2. Search by Databricks concept name OR by synonym
 *   3. Read the full description before using
 *
 * NEVER guess icon names. Always grep the icons directory.
 * NEVER use use:component icons outside their designated control.
 * NEVER use use:action icons to represent objects (Trash = "delete", not "deleted items").
 */
export const iconSelectionRules = {
  categories: ["object", "action", "indicator", "component"] as const,
  format: "/** use:<category> <concept> | <product_area> | <synonyms> */",
  searchPath: "packages/dbui/src/components/icons/",
}
