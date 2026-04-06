import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Breadcrumb, BreadcrumbEllipsis, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { buttonVariants } from "@/lib/button-variants"
import { cn } from "@/lib/utils"
import { SplitButton } from "@/components/ui/split-button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/components/ui/context-menu"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Empty } from "@/components/ui/empty"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { Input } from "@/components/ui/input"
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp"
import { Kbd } from "@/components/ui/kbd"
import { Label } from "@/components/ui/label"
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarTrigger } from "@/components/ui/menubar"
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu"
import { NativeSelect } from "@/components/ui/native-select"
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Skeleton } from "@/components/ui/skeleton"
import { Slider } from "@/components/ui/slider"
import { Spinner } from "@/components/ui/spinner"
import { Switch } from "@/components/ui/switch"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Toggle } from "@/components/ui/toggle"
import { SegmentControl, SegmentControlItem } from "@/components/ui/segment-control"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

export type ComponentEntry = {
  name: string
  slug: string
  description: string
  installCommand: string
  isPattern?: boolean
  preview: React.ReactNode
}

export const components: ComponentEntry[] = [
  {
    name: "Accordion",
    slug: "accordion",
    description: "A vertically stacked set of interactive headings that each reveal a section of content.",
    installCommand: "npx shadcn add accordion",
    preview: (
      <Accordion className="w-full max-w-sm">
        <AccordionItem value="item-1">
          <AccordionTrigger>Is it accessible?</AccordionTrigger>
          <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Is it styled?</AccordionTrigger>
          <AccordionContent>Yes. It comes with default styles that matches the other components.</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Is it animated?</AccordionTrigger>
          <AccordionContent>Yes. It's animated by default, but you can disable it.</AccordionContent>
        </AccordionItem>
      </Accordion>
    ),
  },
  {
    name: "Alert",
    slug: "alert",
    description: "Displays a callout for user attention.",
    installCommand: "npx shadcn add alert",
    preview: (
      <div className="flex flex-col gap-4 w-full max-w-sm">
        <Alert>
          <AlertTitle>Default</AlertTitle>
          <AlertDescription>This is a default alert message.</AlertDescription>
        </Alert>
        <Alert variant="destructive">
          <AlertTitle>Destructive</AlertTitle>
          <AlertDescription>Something went wrong. Please try again.</AlertDescription>
        </Alert>
      </div>
    ),
  },
  {
    name: "Alert Dialog",
    slug: "alert-dialog",
    description: "A modal dialog that interrupts the user with important content and expects a response.",
    installCommand: "npx shadcn add alert-dialog",
    preview: (
      <AlertDialog>
        <AlertDialogTrigger className={cn(buttonVariants({ variant: "outline" }))}>
          Open Alert Dialog
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    ),
  },
  {
    name: "Aspect Ratio",
    slug: "aspect-ratio",
    description: "Displays content within a desired ratio.",
    installCommand: "npx shadcn add aspect-ratio",
    preview: (
      <div className="w-full max-w-sm">
        <AspectRatio ratio={16 / 9} className="bg-muted rounded-md flex items-center justify-center">
          <span className="text-muted-foreground text-sm">16 / 9</span>
        </AspectRatio>
      </div>
    ),
  },
  {
    name: "Avatar",
    slug: "avatar",
    description: "An image element with a fallback for representing the user.",
    installCommand: "npx shadcn add avatar",
    preview: (
      <div className="flex gap-4">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarFallback>MM</AvatarFallback>
        </Avatar>
      </div>
    ),
  },
  {
    name: "Badge",
    slug: "badge",
    description: "Displays a badge or a component that looks like a badge.",
    installCommand: "npx shadcn add badge",
    preview: (
      <div className="flex flex-wrap gap-2">
        <Badge>Default</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="destructive">Destructive</Badge>
        <Badge variant="outline">Outline</Badge>
      </div>
    ),
  },
  {
    name: "Breadcrumb",
    slug: "breadcrumb",
    description: "Displays the path to the current resource using a hierarchy of links.",
    installCommand: "npx shadcn add breadcrumb",
    preview: (
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem><BreadcrumbLink href="#">Home</BreadcrumbLink></BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem><BreadcrumbLink href="#">Components</BreadcrumbLink></BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem><BreadcrumbPage>Breadcrumb</BreadcrumbPage></BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    ),
  },
  {
    name: "Button",
    slug: "button",
    description: "Displays a button or a component that looks like a button.",
    installCommand: "npx shadcn add button",
    preview: (
      <div className="flex flex-wrap gap-2">
        <Button>Default</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="link">Link</Button>
      </div>
    ),
  },
  {
    name: "Split Button",
    slug: "split-button",
    description: "Groups a primary action with a secondary dropdown trigger.",
    installCommand: "npx shadcn add split-button",
    preview: (
      <SplitButton>
        <Button variant="outline">Left</Button>
        <Button variant="outline">Center</Button>
        <Button variant="outline">Right</Button>
      </SplitButton>
    ),
  },
  {
    name: "Calendar",
    slug: "calendar",
    description: "A date field component that allows users to enter and edit date.",
    installCommand: "npx shadcn add calendar",
    preview: (
      <Calendar mode="single" className="rounded-md border" />
    ),
  },
  {
    name: "Card",
    slug: "card",
    description: "Displays a card with header, content, and footer.",
    installCommand: "npx shadcn add card",
    preview: (
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card description goes here.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Card content goes here.</p>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Action</Button>
        </CardFooter>
      </Card>
    ),
  },
  {
    name: "Checkbox",
    slug: "checkbox",
    description: "A control that allows the user to toggle between checked and not checked.",
    installCommand: "npx shadcn add checkbox",
    preview: (
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <Checkbox id="cb1" defaultChecked />
          <Label htmlFor="cb1">Checked</Label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="cb2" />
          <Label htmlFor="cb2">Unchecked</Label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="cb3" disabled />
          <Label htmlFor="cb3" className="text-muted-foreground">Disabled</Label>
        </div>
      </div>
    ),
  },
  {
    name: "Collapsible",
    slug: "collapsible",
    description: "An interactive component which expands/collapses a panel.",
    installCommand: "npx shadcn add collapsible",
    preview: (
      <Collapsible className="w-full max-w-sm">
        <CollapsibleTrigger
          className={cn(buttonVariants({ variant: "outline" }), "w-full justify-between")}
        >
          Toggle content
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-2 p-4 border rounded-md">
          <p className="text-sm text-muted-foreground">This content is collapsible.</p>
        </CollapsibleContent>
      </Collapsible>
    ),
  },
  {
    name: "Command",
    slug: "command",
    description: "Fast, composable, unstyled command menu for React.",
    installCommand: "npx shadcn add command",
    preview: (
      <Command className="rounded-lg border shadow-md w-full max-w-sm">
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem>Calendar</CommandItem>
            <CommandItem>Search</CommandItem>
            <CommandItem>Settings</CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    ),
  },
  {
    name: "Context Menu",
    slug: "context-menu",
    description: "Displays a menu to the user — such as a set of actions or functions — triggered by right-clicking.",
    installCommand: "npx shadcn add context-menu",
    preview: (
      <ContextMenu>
        <ContextMenuTrigger className="flex h-24 w-full max-w-sm items-center justify-center rounded-md border border-dashed text-sm">
          Right-click here
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem>Open</ContextMenuItem>
          <ContextMenuItem>Copy</ContextMenuItem>
          <ContextMenuItem>Delete</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    ),
  },
  {
    name: "Data Table",
    slug: "data-table",
    description: "Powerful table and datagrids built using TanStack Table.",
    installCommand: "— (pattern, no install command)",
    isPattern: true,
    preview: (
      <div className="text-sm text-muted-foreground p-4 border rounded-md w-full max-w-sm text-center">
        Pattern — uses Table + TanStack Table.<br />See documentation for full example.
      </div>
    ),
  },
  {
    name: "Date Picker",
    slug: "date-picker",
    description: "A date picker component with range and presets.",
    installCommand: "— (pattern, no install command)",
    isPattern: true,
    preview: (
      <div className="text-sm text-muted-foreground p-4 border rounded-md w-full max-w-sm text-center">
        Pattern — uses Calendar + Popover.<br />See documentation for full example.
      </div>
    ),
  },
  {
    name: "Dialog",
    slug: "dialog",
    description: "A window overlaid on either the primary window or another dialog window.",
    installCommand: "npx shadcn add dialog",
    preview: (
      <Dialog>
        <DialogTrigger className={cn(buttonVariants({ variant: "outline" }))}>
          Open Dialog
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Dialog Title</DialogTitle>
            <DialogDescription>Dialog description goes here.</DialogDescription>
          </DialogHeader>
          <p className="text-sm">Dialog content goes here.</p>
        </DialogContent>
      </Dialog>
    ),
  },
  {
    name: "Drawer",
    slug: "drawer",
    description: "A drawer component for React.",
    installCommand: "npx shadcn add drawer",
    preview: (
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant="outline">Open Drawer</Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Drawer Title</DrawerTitle>
            <DrawerDescription>Drawer description.</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    ),
  },
  {
    name: "Dropdown Menu",
    slug: "dropdown-menu",
    description: "Displays a menu to the user — such as a set of actions or functions — triggered by a button.",
    installCommand: "npx shadcn add dropdown-menu",
    preview: (
      <DropdownMenu>
        <DropdownMenuTrigger
          nativeButton={false}
          render={
            <span className={cn(buttonVariants({ variant: "outline" }))}>
              Open Menu
            </span>
          }
        />
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Sign out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
  {
    name: "Empty",
    slug: "empty",
    description: "An empty state component.",
    installCommand: "npx shadcn add empty",
    preview: (
      <Empty className="w-full max-w-sm" />
    ),
  },
  {
    name: "Hover Card",
    slug: "hover-card",
    description: "For sighted users to preview content available behind a link.",
    installCommand: "npx shadcn add hover-card",
    preview: (
      <HoverCard>
        <HoverCardTrigger className={cn(buttonVariants({ variant: "link" }))}>
          @shadcn
        </HoverCardTrigger>
        <HoverCardContent>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">@shadcn</h4>
            <p className="text-sm text-muted-foreground">The creator of shadcn/ui.</p>
          </div>
        </HoverCardContent>
      </HoverCard>
    ),
  },
  {
    name: "Input",
    slug: "input",
    description: "Displays a form input field or a component that looks like an input field.",
    installCommand: "npx shadcn add input",
    preview: (
      <div className="flex flex-col gap-3 w-full max-w-sm">
        <Input placeholder="Default input" />
        <Input placeholder="Disabled input" disabled />
      </div>
    ),
  },
  {
    name: "Input OTP",
    slug: "input-otp",
    description: "Accessible one-time password component with copy paste functionality.",
    installCommand: "npx shadcn add input-otp",
    preview: (
      <InputOTP maxLength={6}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
    ),
  },
  {
    name: "Kbd",
    slug: "kbd",
    description: "Displays keyboard shortcuts.",
    installCommand: "npx shadcn add kbd",
    preview: (
      <div className="flex flex-wrap gap-2 items-center">
        <Kbd>⌘</Kbd>
        <span className="text-muted-foreground">+</span>
        <Kbd>K</Kbd>
        <span className="text-muted-foreground text-sm ml-2">Open command palette</span>
      </div>
    ),
  },
  {
    name: "Label",
    slug: "label",
    description: "Renders an accessible label associated with controls.",
    installCommand: "npx shadcn add label",
    preview: (
      <div className="flex flex-col gap-2 w-full max-w-sm">
        <Label htmlFor="email">Email address</Label>
        <Input id="email" placeholder="you@example.com" />
      </div>
    ),
  },
  {
    name: "Menubar",
    slug: "menubar",
    description: "A visually persistent menu common in desktop applications.",
    installCommand: "npx shadcn add menubar",
    preview: (
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>New</MenubarItem>
            <MenubarItem>Open</MenubarItem>
            <MenubarSeparator />
            <MenubarItem>Save</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>Edit</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>Undo</MenubarItem>
            <MenubarItem>Redo</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>View</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>Zoom In</MenubarItem>
            <MenubarItem>Zoom Out</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    ),
  },
  {
    name: "Navigation Menu",
    slug: "navigation-menu",
    description: "A collection of links for navigating websites.",
    installCommand: "npx shadcn add navigation-menu",
    preview: (
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="p-4 w-48">
                <NavigationMenuLink href="#">Introduction</NavigationMenuLink>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink href="#" className="px-4 py-2 text-sm">Docs</NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    ),
  },
  {
    name: "Native Select",
    slug: "native-select",
    description: "A native HTML select element.",
    installCommand: "npx shadcn add native-select",
    preview: (
      <NativeSelect className="w-full max-w-sm">
        <option value="">Select an option</option>
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
        <option value="3">Option 3</option>
      </NativeSelect>
    ),
  },
  {
    name: "Pagination",
    slug: "pagination",
    description: "Pagination with page navigation, next and previous links.",
    installCommand: "npx shadcn add pagination",
    preview: (
      <Pagination>
        <PaginationContent>
          <PaginationItem><PaginationPrevious href="#" /></PaginationItem>
          <PaginationItem><PaginationLink href="#">1</PaginationLink></PaginationItem>
          <PaginationItem><PaginationLink href="#" isActive>2</PaginationLink></PaginationItem>
          <PaginationItem><PaginationLink href="#">3</PaginationLink></PaginationItem>
          <PaginationItem><PaginationEllipsis /></PaginationItem>
          <PaginationItem><PaginationNext href="#" /></PaginationItem>
        </PaginationContent>
      </Pagination>
    ),
  },
  {
    name: "Popover",
    slug: "popover",
    description: "Displays rich content in a portal, triggered by a button.",
    installCommand: "npx shadcn add popover",
    preview: (
      <Popover>
        <PopoverTrigger className={cn(buttonVariants({ variant: "outline" }))}>
          Open Popover
        </PopoverTrigger>
        <PopoverContent>
          <p className="text-sm">Popover content goes here.</p>
        </PopoverContent>
      </Popover>
    ),
  },
  {
    name: "Progress",
    slug: "progress",
    description: "Displays an indicator showing the completion progress of a task.",
    installCommand: "npx shadcn add progress",
    preview: (
      <div className="flex flex-col gap-4 w-full max-w-sm">
        <Progress value={33} />
        <Progress value={66} />
        <Progress value={100} />
      </div>
    ),
  },
  {
    name: "Radio Group",
    slug: "radio-group",
    description: "A set of checkable buttons — known as radio buttons — where no more than one can be checked at a time.",
    installCommand: "npx shadcn add radio-group",
    preview: (
      <RadioGroup defaultValue="option-1">
        <div className="flex items-center gap-2">
          <RadioGroupItem value="option-1" id="r1" />
          <Label htmlFor="r1">Option 1</Label>
        </div>
        <div className="flex items-center gap-2">
          <RadioGroupItem value="option-2" id="r2" />
          <Label htmlFor="r2">Option 2</Label>
        </div>
        <div className="flex items-center gap-2">
          <RadioGroupItem value="option-3" id="r3" />
          <Label htmlFor="r3">Option 3</Label>
        </div>
      </RadioGroup>
    ),
  },
  {
    name: "Resizable",
    slug: "resizable",
    description: "Accessible resizable panel groups and layouts.",
    installCommand: "npx shadcn add resizable",
    preview: (
      <ResizablePanelGroup orientation="horizontal" className="w-full max-w-sm rounded-lg border">
        <ResizablePanel defaultSize={50}>
          <div className="flex h-24 items-center justify-center p-6 text-sm text-muted-foreground">Panel A</div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={50}>
          <div className="flex h-24 items-center justify-center p-6 text-sm text-muted-foreground">Panel B</div>
        </ResizablePanel>
      </ResizablePanelGroup>
    ),
  },
  {
    name: "Scroll Area",
    slug: "scroll-area",
    description: "Augments native scroll functionality for custom, cross-browser styling.",
    installCommand: "npx shadcn add scroll-area",
    preview: (
      <ScrollArea className="h-40 w-full max-w-sm rounded-md border p-4">
        {Array.from({ length: 20 }, (_, i) => (
          <p key={i} className="text-sm py-1 text-muted-foreground">Item {i + 1}</p>
        ))}
      </ScrollArea>
    ),
  },
  {
    name: "Select",
    slug: "select",
    description: "Displays a list of options for the user to pick from — triggered by a button.",
    installCommand: "npx shadcn add select",
    preview: (
      <Select>
        <SelectTrigger className="w-full max-w-sm">
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="orange">Orange</SelectItem>
        </SelectContent>
      </Select>
    ),
  },
  {
    name: "Separator",
    slug: "separator",
    description: "Visually or semantically separates content.",
    installCommand: "npx shadcn add separator",
    preview: (
      <div className="w-full max-w-sm space-y-4">
        <div>
          <p className="text-sm font-medium">Section A</p>
          <Separator className="my-2" />
          <p className="text-sm text-muted-foreground">Section B</p>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm">Left</span>
          <Separator orientation="vertical" className="h-4" />
          <span className="text-sm">Right</span>
        </div>
      </div>
    ),
  },
  {
    name: "Sheet",
    slug: "sheet",
    description: "Extends the Dialog component to display content that complements the main content of the screen.",
    installCommand: "npx shadcn add sheet",
    preview: (
      <div className="flex flex-wrap gap-2">
        {(["top", "right", "bottom", "left"] as const).map((side) => (
          <Sheet key={side}>
            <SheetTrigger
              className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
            >
              {side}
            </SheetTrigger>
            <SheetContent side={side}>
              <SheetHeader>
                <SheetTitle>Sheet — {side}</SheetTitle>
                <SheetDescription>Sheet content from the {side}.</SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        ))}
      </div>
    ),
  },
  {
    name: "Skeleton",
    slug: "skeleton",
    description: "Use to show a placeholder while content is loading.",
    installCommand: "npx shadcn add skeleton",
    preview: (
      <div className="flex flex-col gap-3 w-full max-w-sm">
        <div className="flex items-center gap-3">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="space-y-2 flex-1">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </div>
        <Skeleton className="h-24 w-full" />
      </div>
    ),
  },
  {
    name: "Slider",
    slug: "slider",
    description: "An input where the user selects a value from within a given range.",
    installCommand: "npx shadcn add slider",
    preview: (
      <div className="w-full max-w-sm space-y-4">
        <Slider defaultValue={[33]} max={100} step={1} />
        <Slider defaultValue={[20, 80]} max={100} step={1} />
      </div>
    ),
  },
  {
    name: "Spinner",
    slug: "spinner",
    description: "A loading spinner component.",
    installCommand: "npx shadcn add spinner",
    preview: (
      <div className="flex gap-4 items-center">
        <Spinner className="size-3" />
        <Spinner />
        <Spinner className="size-6" />
      </div>
    ),
  },
  {
    name: "Switch",
    slug: "switch",
    description: "A control that allows the user to toggle between checked and not checked.",
    installCommand: "npx shadcn add switch",
    preview: (
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <Switch id="sw1" defaultChecked />
          <Label htmlFor="sw1">On</Label>
        </div>
        <div className="flex items-center gap-2">
          <Switch id="sw2" />
          <Label htmlFor="sw2">Off</Label>
        </div>
        <div className="flex items-center gap-2">
          <Switch id="sw3" disabled />
          <Label htmlFor="sw3" className="text-muted-foreground">Disabled</Label>
        </div>
      </div>
    ),
  },
  {
    name: "Table",
    slug: "table",
    description: "A responsive table component.",
    installCommand: "npx shadcn add table",
    preview: (
      <Table className="w-full max-w-sm">
        <TableCaption>A list of recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Invoice</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>INV001</TableCell>
            <TableCell>Paid</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>INV002</TableCell>
            <TableCell>Pending</TableCell>
            <TableCell className="text-right">$150.00</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    ),
  },
  {
    name: "Tabs",
    slug: "tabs",
    description: "A set of layered sections of content — known as tab panels — that are displayed one at a time.",
    installCommand: "npx shadcn add tabs",
    preview: (
      <Tabs defaultValue="account" className="w-full max-w-sm">
        <TabsList className="w-full">
          <TabsTrigger value="account" className="flex-1">Account</TabsTrigger>
          <TabsTrigger value="password" className="flex-1">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <p className="text-sm text-muted-foreground p-2">Account settings go here.</p>
        </TabsContent>
        <TabsContent value="password">
          <p className="text-sm text-muted-foreground p-2">Password settings go here.</p>
        </TabsContent>
      </Tabs>
    ),
  },
  {
    name: "Textarea",
    slug: "textarea",
    description: "Displays a form textarea or a component that looks like a textarea.",
    installCommand: "npx shadcn add textarea",
    preview: (
      <Textarea placeholder="Type your message here." className="w-full max-w-sm" />
    ),
  },
  {
    name: "Toggle",
    slug: "toggle",
    description: "A two-state button that can be either on or off.",
    installCommand: "npx shadcn add toggle",
    preview: (
      <div className="flex flex-wrap gap-2">
        <Toggle>Default</Toggle>
        <Toggle variant="outline">Outline</Toggle>
        <Toggle size="sm">Small</Toggle>
      </div>
    ),
  },
  {
    name: "Segment Control",
    slug: "segment-control",
    description: "A group of toggle buttons for selecting one or more options.",
    installCommand: "npx shadcn add segment-control",
    preview: (
      <div className="flex flex-col gap-4">
        <SegmentControl>
          <SegmentControlItem value="a">A</SegmentControlItem>
          <SegmentControlItem value="b">B</SegmentControlItem>
          <SegmentControlItem value="c">C</SegmentControlItem>
        </SegmentControl>
        <SegmentControl variant="outline">
          <SegmentControlItem value="bold">Bold</SegmentControlItem>
          <SegmentControlItem value="italic">Italic</SegmentControlItem>
          <SegmentControlItem value="underline">Underline</SegmentControlItem>
        </SegmentControl>
      </div>
    ),
  },
  {
    name: "Tooltip",
    slug: "tooltip",
    description: "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
    installCommand: "npx shadcn add tooltip",
    preview: (
      <Tooltip>
        <TooltipTrigger className={cn(buttonVariants({ variant: "outline" }))}>
          Hover me
        </TooltipTrigger>
        <TooltipContent>
          <p>This is a tooltip</p>
        </TooltipContent>
      </Tooltip>
    ),
  },
]

export const componentsBySlug = Object.fromEntries(
  components.map((c) => [c.slug, c])
)
