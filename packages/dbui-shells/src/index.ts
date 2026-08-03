// Shells — full page layouts that compose DBUI components.
export { Base } from "./shells/Base"
export {
  CatalogLayout,
  CatalogTree,
  CatalogLanding,
} from "./shells/CatalogExplorer"
export type { CatalogSection, CatalogItem } from "./shells/CatalogExplorer"

// Compositions — opinionated multi-component arrangements that fit inside
// a shell's content area (PageHeader, FilterPillBar, ListView, etc.).
// Populated as the system grows; see project/ARCHITECTURE.md for the plan.
export { DataTreeExplorer } from "./compositions/DataTreeExplorer"
export type { DataTreeExplorerProps } from "./compositions/DataTreeExplorer"
export { FileTreeExplorer } from "./compositions/FileTreeExplorer"
export type { FileTreeExplorerProps } from "./compositions/FileTreeExplorer"
export { PreviewPopup } from "./compositions/PreviewPopup"
export type { PreviewPopupProps, AssetQualityStatus } from "./compositions/PreviewPopup"

// L2 semantic trees — re-exported here so consumers building catalog/workspace
// surfaces have a single import surface (`@muditmittal/dbui-shells`) for both
// the explorer compositions and the typed tree primitives they consume.
export { DataTree, FileTree, DATA_KIND_ICON, FILE_KIND_ICON } from "dbui/components/ui/data-tree"
export type {
  DataAssetKind,
  DataTreeNode,
  DataTreeSection,
  FileAssetKind,
  FileTreeNode,
} from "dbui/components/ui/data-tree"

// Components — building blocks used by shells.
export { PlatformHeader } from "./components/PlatformHeader"
export { PlatformNav } from "./components/PlatformNav"
export { AssistantPanel } from "./components/AssistantPanel"
export { SearchPopup } from "./components/SearchPopup"
export { FacetedFilter } from "./components/FacetedFilter"
export type { FacetData } from "./components/FacetedFilter"
