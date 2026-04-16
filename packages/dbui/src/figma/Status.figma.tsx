import figma from "@figma/code-connect"
import { Status } from "../components/ui/status"

figma.connect(Status, "https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv/DBUI-Design-System?node-id=3174-4132", {
  props: {
    status: figma.enum("Status", {
      "Online": "online",
      "Ready": "ready",
      "Offline": "offline",
      "Pending": "pending",
      "Running": "running",
      "Syncing": "syncing",
      "Canceled": "canceled",
      "Stopped": "stopped",
      "Info": "info",
      "Success": "success",
      "Warning": "warning",
      "Error": "error",
    }),
    size: figma.enum("Size", {
      "sm": "sm",
      "md": "md",
    }),
  },
  example: ({ status, size }) => <Status status={status} size={size} />,
})
