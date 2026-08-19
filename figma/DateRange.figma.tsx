import figma from "@figma/code-connect"
import { DateRange, DateRangeField } from "dbui/components/ui/date-range"

// `Date Range` — the start/end pair. It had a live `@figma` tag pointing at this
// node and no Code Connect coming back, so the link only worked in one direction.
//
// No variant to map: the Figma component has no properties, and the two fields are
// composed rather than configured. There is no date picker primitive yet, so the
// calendar popover attaches per field at the call site.
figma.connect(
  DateRange,
  "https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv/DBUI-Design-System?node-id=3885-3146",
  {
    example: () => (
      <DateRange>
        <DateRangeField label="From" value="2026-01-07" />
        <DateRangeField label="To" value="2026-02-04" />
      </DateRange>
    ),
  }
)
