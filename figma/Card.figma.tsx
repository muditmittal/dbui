import figma from "@figma/code-connect"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../components/ui/card"

figma.connect(Card, "https://www.figma.com/design/OftbSQf85jOPln9RhSEhVv/DBUI-Design-System?node-id=3154-4736", {
  props: {
    type: figma.enum("Type", {
      "Post": "post",
      "Asset Preview": "asset-preview",
      "Source": "source",
      "Asset Result": "asset-result",
    }),
  },
  example: ({ type }) => (
    <Card type={type}>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description text goes here.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card content</p>
      </CardContent>
      <CardFooter>
        <p>Footer</p>
      </CardFooter>
    </Card>
  ),
})
