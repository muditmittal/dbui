// Type declarations for icon components (symlinked from apps/docs)
// Icon components use a custom `size` prop not in SVGProps
declare module "@/components/icons/*" {
  import { ForwardRefExoticComponent, SVGProps, RefAttributes } from "react"
  type IconProps = SVGProps<SVGSVGElement> & { size?: number }
  const Icon: ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>>
  export { Icon }
}
