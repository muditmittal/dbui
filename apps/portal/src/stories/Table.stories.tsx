import type { Meta, StoryObj } from "@storybook/react"
import {
  Table, TableHeader, TableBody, TableRow, TableHead, TableCell,
  TableCellIcon, TableCellTitle, TableCellTitleContent, TableCellMeta,
  TableCellStatus, TableCellUser, TableCellExpandable, TableCellTime,
  TableSortButton,
} from "dbui/components/ui/table"
import { Status } from "dbui/components/ui/status"
import { Tag, TagLabel } from "dbui/components/ui/tag"
import { Avatar, AvatarFallback } from "dbui/components/ui/avatar"
import { Table as TableIcon } from "@/components/icons/Table"
import { Notebook } from "@/components/icons/Notebook"
import { Overflow } from "@/components/icons/Overflow"

const meta: Meta = {
  title: "Content/Table",
  parameters: { layout: "padded" },
}

export default meta

/** Realistic table showing multiple cell content types together */
export const Default: StoryObj = {
  name: "Realistic Table",
  render: () => (
    <div className="w-[800px]">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <div className="flex items-center gap-1">
                Name
                <TableSortButton sorted direction="asc" />
              </div>
            </TableHead>
            <TableHead>
              <div className="flex items-center gap-1">
                Owner
                <TableSortButton />
              </div>
            </TableHead>
            <TableHead>
              <div className="flex items-center gap-1">
                Status
                <TableSortButton />
              </div>
            </TableHead>
            <TableHead>
              <div className="flex items-center gap-1">
                Duration
                <TableSortButton sorted direction="desc" />
              </div>
            </TableHead>
            <TableHead>Tags</TableHead>
            <TableHead className="w-10" />
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>
              <TableCellTitle>
                <TableCellIcon><TableIcon /></TableCellIcon>
                <TableCellTitleContent>
                  <span>customers</span>
                  <TableCellMeta>main.default</TableCellMeta>
                </TableCellTitleContent>
              </TableCellTitle>
            </TableCell>
            <TableCell>
              <TableCellUser>
                <Avatar size="sm"><AvatarFallback>MM</AvatarFallback></Avatar>
                mudit@databricks.com
              </TableCellUser>
            </TableCell>
            <TableCell>
              <TableCellStatus>
                <Status status="online" size="sm" />
                Healthy
              </TableCellStatus>
            </TableCell>
            <TableCell><TableCellTime barWidth={60}>2.3s</TableCellTime></TableCell>
            <TableCell>
              <div className="flex gap-1">
                <Tag><TagLabel>prod</TagLabel></Tag>
                <Tag><TagLabel>pii</TagLabel></Tag>
              </div>
            </TableCell>
            <TableCell className="text-right">
              <button className="inline-flex size-6 items-center justify-center rounded-sm text-muted-foreground hover:text-foreground">
                <Overflow />
              </button>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <TableCellTitle>
                <TableCellIcon><Notebook /></TableCellIcon>
                <TableCellTitleContent>
                  <span>analysis_pipeline</span>
                  <TableCellMeta>workspace.shared</TableCellMeta>
                </TableCellTitleContent>
              </TableCellTitle>
            </TableCell>
            <TableCell>
              <TableCellUser>
                <Avatar size="sm"><AvatarFallback>JD</AvatarFallback></Avatar>
                jane@databricks.com
              </TableCellUser>
            </TableCell>
            <TableCell>
              <TableCellStatus>
                <Status status="running" size="sm" />
                Running
              </TableCellStatus>
            </TableCell>
            <TableCell><TableCellTime barWidth={120}>12.8s</TableCellTime></TableCell>
            <TableCell>
              <div className="flex gap-1">
                <Tag><TagLabel>ml</TagLabel></Tag>
              </div>
            </TableCell>
            <TableCell className="text-right">
              <button className="inline-flex size-6 items-center justify-center rounded-sm text-muted-foreground hover:text-foreground">
                <Overflow />
              </button>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <TableCellTitle>
                <TableCellIcon><TableIcon /></TableCellIcon>
                <TableCellTitleContent>
                  <span>orders_2024</span>
                  <TableCellMeta>main.analytics</TableCellMeta>
                </TableCellTitleContent>
              </TableCellTitle>
            </TableCell>
            <TableCell>
              <TableCellUser>
                <Avatar size="sm"><AvatarFallback>AK</AvatarFallback></Avatar>
                alex@databricks.com
              </TableCellUser>
            </TableCell>
            <TableCell>
              <TableCellStatus>
                <Status status="error" size="sm" />
                Failed
              </TableCellStatus>
            </TableCell>
            <TableCell><TableCellTime barWidth={20}>0.4s</TableCellTime></TableCell>
            <TableCell />
            <TableCell className="text-right">
              <button className="inline-flex size-6 items-center justify-center rounded-sm text-muted-foreground hover:text-foreground">
                <Overflow />
              </button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  ),
}

export const CellTypes: StoryObj = {
  name: "Cell Content Types",
  render: () => (
    <div className="w-[500px]">
      <p className="text-[12px] text-muted-foreground mb-2">Maps to Figma .Content — 8 cell type variants</p>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[120px]">Type</TableHead>
            <TableHead>Example</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="text-muted-foreground">Text</TableCell>
            <TableCell>Simple cell value</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-muted-foreground">With Icon</TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <TableCellIcon><Notebook /></TableCellIcon>
                my_notebook
              </div>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-muted-foreground">Title</TableCell>
            <TableCell>
              <TableCellTitle>
                <TableCellIcon><TableIcon /></TableCellIcon>
                <TableCellTitleContent>
                  <span>customers</span>
                  <TableCellMeta>main.default</TableCellMeta>
                </TableCellTitleContent>
              </TableCellTitle>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-muted-foreground">Status</TableCell>
            <TableCell>
              <TableCellStatus>
                <Status status="success" size="sm" />
                Healthy
              </TableCellStatus>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-muted-foreground">User</TableCell>
            <TableCell>
              <TableCellUser>
                <Avatar size="sm"><AvatarFallback>M</AvatarFallback></Avatar>
                mudit@databricks.com
              </TableCellUser>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-muted-foreground">Time</TableCell>
            <TableCell>
              <TableCellTime barWidth={40}>123ms</TableCellTime>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-muted-foreground">Expandable</TableCell>
            <TableCell>
              <TableCellExpandable>{"{ nested_json }"}</TableCellExpandable>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="text-muted-foreground">Tag Group</TableCell>
            <TableCell>
              <div className="flex flex-wrap gap-1">
                <Tag><TagLabel>env:prod</TagLabel></Tag>
                <Tag><TagLabel>team:data</TagLabel></Tag>
                <Tag><TagLabel>+3</TagLabel></Tag>
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  ),
}

export const SortableHeaders: StoryObj = {
  render: () => (
    <div className="w-[500px]">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <div className="flex items-center gap-1">
                Name
                <TableSortButton sorted direction="asc" />
              </div>
            </TableHead>
            <TableHead>
              <div className="flex items-center gap-1">
                Status
                <TableSortButton />
              </div>
            </TableHead>
            <TableHead>
              <div className="flex items-center gap-1">
                Duration
                <TableSortButton sorted direction="desc" />
              </div>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>query_1</TableCell>
            <TableCell><TableCellStatus><Status status="running" size="sm" />Running</TableCellStatus></TableCell>
            <TableCell><TableCellTime barWidth={60}>2.3s</TableCellTime></TableCell>
          </TableRow>
          <TableRow>
            <TableCell>query_2</TableCell>
            <TableCell><TableCellStatus><Status status="success" size="sm" />Completed</TableCellStatus></TableCell>
            <TableCell><TableCellTime barWidth={30}>0.8s</TableCellTime></TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  ),
}
