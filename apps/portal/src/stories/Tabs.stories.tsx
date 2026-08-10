import type { Meta, StoryObj } from "@storybook/react"
import { Tabs, TabsContent, TabsList, TabsTrigger, TabsIcon } from "dbui/components/ui/tabs"
import { Home } from "@/components/icons/Home"
import { Notebook } from "@/components/icons/Notebook"
import { Gear } from "@/components/icons/Gear"
import { ComponentMeta } from "./components/ComponentMeta"
import componentSource from "dbui/components/ui/tabs?raw"
import { ProductionMap } from "./components/ProductionMap"

const meta: Meta = {
  title: "Components/Content/Tabs",
  parameters: { layout: "padded" },
}

export default meta

export const Playground: StoryObj = {
  render: () => (
    <div>
      <h2 style={{ fontFamily: "'SF Pro Display', -apple-system, sans-serif", fontSize: 22, fontWeight: 600, lineHeight: "28px", margin: "0 0 24px 0", color: "#161616" }}>Tabs</h2>

      <Tabs defaultValue="home">
        <TabsList>
          <TabsTrigger value="home">Home</TabsTrigger>
          <TabsTrigger value="notebooks">Notebooks</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="home">
          <div className="text-[13px] text-text-subtle p-4">Home content</div>
        </TabsContent>
        <TabsContent value="notebooks">
          <div className="text-[13px] text-text-subtle p-4">Notebooks content</div>
        </TabsContent>
        <TabsContent value="settings">
          <div className="text-[13px] text-text-subtle p-4">Settings content</div>
        </TabsContent>
      </Tabs>


      <ComponentMeta source={componentSource} componentKey="tabs" />

      <ProductionMap componentKey="tabs" />
    </div>
  ),
}

/**
 * The two variants side by side, because the only way to pick between them is to
 * see what each one's selected state is made of. `default` spends a rule;
 * `pill` spends a fill. Both are the same 13/16 label at regular weight — the
 * weight is not part of either answer.
 */
export const Variants: StoryObj = {
  render: () => (
    <div className="flex max-w-[640px] flex-col gap-8">
      <section className="flex flex-col gap-2">
        <h3 className="type-eyebrow text-text-subtle">
          variant=&quot;default&quot; — indexes one long page
        </h3>
        <div className="rounded-2 border border-border-base p-4">
          <Tabs defaultValue="overview">
            <TabsList width="full">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="notebooks">Notebooks</TabsTrigger>
              <TabsTrigger value="settings" disabled>
                Settings
              </TabsTrigger>
            </TabsList>
            <TabsContent value="overview">
              <p className="type-body p-4 text-text-subtle">
                A rule under the selected word, and a rule along the list&rsquo;s lower edge.
              </p>
            </TabsContent>
            <TabsContent value="notebooks">
              <p className="type-body p-4 text-text-subtle">Notebooks content</p>
            </TabsContent>
            <TabsContent value="settings">
              <p className="type-body p-4 text-text-subtle">Settings content</p>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <section className="flex flex-col gap-2">
        <h3 className="type-eyebrow text-text-subtle">
          variant=&quot;pill&quot; — switches the panel below
        </h3>
        <div className="rounded-2 border border-border-base p-4">
          <Tabs defaultValue="overview">
            <TabsList variant="pill" width="full">
              <TabsTrigger value="overview">
                <TabsIcon>
                  <Home />
                </TabsIcon>
                Overview
              </TabsTrigger>
              <TabsTrigger value="notebooks">
                <TabsIcon>
                  <Notebook />
                </TabsIcon>
                Notebooks
              </TabsTrigger>
              <TabsTrigger value="settings" disabled>
                <TabsIcon>
                  <Gear />
                </TabsIcon>
                Settings
              </TabsTrigger>
            </TabsList>
            <TabsContent value="overview">
              <p className="type-body p-4 text-text-subtle">
                The selected item is a chip in Toggle&rsquo;s selection language — grey fill, grey
                boundary, strong label, bold. The boundary is what keeps hover off it: the hover
                and selected fills are the same token value.
              </p>
            </TabsContent>
            <TabsContent value="notebooks">
              <p className="type-body p-4 text-text-subtle">Notebooks content</p>
            </TabsContent>
            <TabsContent value="settings">
              <p className="type-body p-4 text-text-subtle">Settings content</p>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  ),
}

export const FullWidth: StoryObj = {
  render: () => (
    // Both lists sit in the same bounded container, so the only thing that
    // differs between them is how far the rule runs.
    <div className="flex max-w-[640px] flex-col gap-8">
      <section className="flex flex-col gap-2">
        <h3 className="type-eyebrow text-text-subtle">width=&quot;fit&quot; — default</h3>
        <div className="rounded-2 border border-border-base p-4">
          <Tabs defaultValue="overview">
            <TabsList>
              <TabsTrigger value="overview">
                <TabsIcon>
                  <Home />
                </TabsIcon>
                Overview
              </TabsTrigger>
              <TabsTrigger value="notebooks">
                <TabsIcon>
                  <Notebook />
                </TabsIcon>
                Notebooks
              </TabsTrigger>
              <TabsTrigger value="settings">
                <TabsIcon>
                  <Gear />
                </TabsIcon>
                Settings
              </TabsTrigger>
            </TabsList>
            <TabsContent value="overview">
              <p className="type-body p-4 text-text-subtle">
                The rule stops at the last trigger.
              </p>
            </TabsContent>
            <TabsContent value="notebooks">
              <p className="type-body p-4 text-text-subtle">Notebooks content</p>
            </TabsContent>
            <TabsContent value="settings">
              <p className="type-body p-4 text-text-subtle">Settings content</p>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <section className="flex flex-col gap-2">
        <h3 className="type-eyebrow text-text-subtle">width=&quot;full&quot;</h3>
        <div className="rounded-2 border border-border-base p-4">
          <Tabs defaultValue="overview">
            <TabsList width="full">
              <TabsTrigger value="overview">
                <TabsIcon>
                  <Home />
                </TabsIcon>
                Overview
              </TabsTrigger>
              <TabsTrigger value="notebooks">
                <TabsIcon>
                  <Notebook />
                </TabsIcon>
                Notebooks
              </TabsTrigger>
              <TabsTrigger value="settings">
                <TabsIcon>
                  <Gear />
                </TabsIcon>
                Settings
              </TabsTrigger>
            </TabsList>
            <TabsContent value="overview">
              <p className="type-body p-4 text-text-subtle">
                The rule runs the width of the region. Triggers keep their natural width and stay
                left-aligned — for triggers that divide the width between them, use SegmentControl.
              </p>
            </TabsContent>
            <TabsContent value="notebooks">
              <p className="type-body p-4 text-text-subtle">Notebooks content</p>
            </TabsContent>
            <TabsContent value="settings">
              <p className="type-body p-4 text-text-subtle">Settings content</p>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  ),
}
