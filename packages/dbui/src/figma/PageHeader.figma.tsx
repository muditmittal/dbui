import figma from "@figma/code-connect"
import { PageHeader, PageHeaderTitleBar, PageHeaderTitle, PageHeaderActions } from "../components/ui/page-header"

// Figma: Page Header (Breadcrumb + TitleBar + Tabs)
// url=https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv/DBUI-Design-System?node-id=3247-5956
figma.connect(PageHeader, "https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv/DBUI-Design-System?node-id=3247-5956", {
  example: () => (
    <PageHeader>
      {/* <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem><BreadcrumbLink>Label</BreadcrumbLink></BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem><BreadcrumbPage>Label</BreadcrumbPage></BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb> */}
      <PageHeaderTitleBar>
        <PageHeaderTitle>
          {/* <Notebook className="size-5 text-muted-foreground" /> */}
          <h1 className="text-[22px] leading-[28px] font-semibold">Page Title</h1>
          {/* <Button variant="ghost" size="icon-sm"><Copy /></Button> */}
          {/* <Button variant="ghost" size="icon-sm"><Star /></Button> */}
        </PageHeaderTitle>
        <PageHeaderActions>
          {/* <Button variant="outline">Label</Button> */}
          {/* <Button>Label</Button> */}
        </PageHeaderActions>
      </PageHeaderTitleBar>
      {/* <Tabs>
        <TabsList>
          <TabsTrigger value="tab1">Label</TabsTrigger>
          <TabsTrigger value="tab2">Label</TabsTrigger>
        </TabsList>
      </Tabs> */}
    </PageHeader>
  ),
})
