/**
 * Minimal class-variance-authority implementation.
 * Inlined to avoid npm dependency.
 */

type ClassValue = string | null | undefined | false
type StringToBoolean<T> = T extends "true" | "false" ? boolean : T

type ConfigSchema = Record<string, Record<string, ClassValue>>

type ConfigVariants<T extends ConfigSchema> = {
  [K in keyof T]?: StringToBoolean<keyof T[K]> | null | undefined
}

type Config<T extends ConfigSchema> = {
  base?: ClassValue
  variants?: T
  defaultVariants?: ConfigVariants<T>
  compoundVariants?: (ConfigVariants<T> & { class?: ClassValue; className?: ClassValue })[]
}

export type VariantProps<T extends (...args: any) => any> = Exclude<Parameters<T>[0], undefined>

export function cva<T extends ConfigSchema>(base?: ClassValue, config?: Config<T>) {
  return (props?: ConfigVariants<T> & { class?: ClassValue; className?: ClassValue }): string => {
    const parts: string[] = []
    if (base) parts.push(base)

    const variants = config?.variants
    if (variants && props) {
      for (const key in variants) {
        const value = props[key as keyof typeof props] ?? config?.defaultVariants?.[key]
        if (value != null) {
          const cls = variants[key][value as string]
          if (cls) parts.push(cls)
        }
      }
    } else if (variants && config?.defaultVariants) {
      for (const key in config.defaultVariants) {
        const value = config.defaultVariants[key]
        if (value != null) {
          const cls = variants[key]?.[value as string]
          if (cls) parts.push(cls)
        }
      }
    }

    if (config?.compoundVariants) {
      for (const cv of config.compoundVariants) {
        const { class: cls, className, ...conditions } = cv
        const match = Object.entries(conditions).every(([key, val]) => {
          const actual = (props as any)?.[key] ?? config?.defaultVariants?.[key]
          return Array.isArray(val) ? val.includes(actual) : actual === val
        })
        if (match) {
          if (cls) parts.push(cls)
          if (className) parts.push(className)
        }
      }
    }

    const extra = (props as any)?.class || (props as any)?.className
    if (extra) parts.push(extra)

    return parts.filter(Boolean).join(" ")
  }
}
