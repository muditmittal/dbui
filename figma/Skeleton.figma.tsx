import figma from "@figma/code-connect"
import { Skeleton } from "../components/ui/skeleton"

figma.connect(Skeleton, "https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv/DBUI-Design-System?node-id=3128-1778", {
  example: () => <Skeleton className="h-5 w-[200px]" />,
})
