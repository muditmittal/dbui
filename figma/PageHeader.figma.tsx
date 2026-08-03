import figma from "@figma/code-connect"
import { PageHeader, PageHeaderTitle, PageHeaderActions } from "../components/ui/page-header"
import { Button } from "../components/ui/button"

// Figma: Page Header (single horizontal row — title + actions)
// url=https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv/DBUI-Design-System?node-id=3860-1619
figma.connect(
  PageHeader,
  "https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv/DBUI-Design-System?node-id=3860-1619",
  {
    props: {
      title: figma.textContent("PageHeaderTitleText"),
    },
    example: ({ title }) => (
      <PageHeader>
        <PageHeaderTitle>
          <h1 className="text-[22px] leading-[28px] font-semibold">{title}</h1>
        </PageHeaderTitle>
        <PageHeaderActions>
          <Button variant="outline">Label</Button>
          <Button>Label</Button>
        </PageHeaderActions>
      </PageHeader>
    ),
  },
)
