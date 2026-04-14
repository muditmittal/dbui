"use client"

import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { type VariantProps } from "class-variance-authority"

import { buttonVariants } from "../../lib/button-variants"
import { cn } from "../../lib/utils"
import { Loading as LoadingIcon } from "../icons/Loading"

function Button({
  className,
  variant = "default",
  size = "md",
  loading = false,
  loadingText,
  children,
  ...props
}: ButtonPrimitive.Props &
  VariantProps<typeof buttonVariants> & {
    loading?: boolean
    loadingText?: string
  }) {
  return (
    <ButtonPrimitive
      data-slot="button"
      disabled={props.disabled}
      aria-busy={loading || undefined}
      aria-disabled={loading || props.disabled || undefined}
      className={cn(
        buttonVariants({ variant, size, className }),
        loading && "pointer-events-none"
      )}
      {...props}
    >
      {loading ? (
        <>
          <LoadingIcon className="animate-spin" />
          {loadingText ?? <span className="opacity-0">{children}</span>}
        </>
      ) : (
        children
      )}
    </ButtonPrimitive>
  )
}

export { Button }
export { buttonVariants } from "../../lib/button-variants"
