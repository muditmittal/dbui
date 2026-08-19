import figma from "@figma/code-connect"
import { Avatar, AvatarImage, AvatarFallback } from "dbui/components/ui/avatar"

figma.connect(Avatar, "https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv/DBUI-Design-System?node-id=1084-1542", {
  props: {
    // The axis is `Type`, not `Size`. Avatar has no size axis in Figma.
    type: figma.enum("Type", {
      Initials: "initials",
      Icon: "icon",
    }),
  },
  example: ({ type }) => (
    <Avatar type={type}>
      <AvatarImage src="/avatar.jpg" alt="User" />
      <AvatarFallback>AB</AvatarFallback>
    </Avatar>
  ),
})
