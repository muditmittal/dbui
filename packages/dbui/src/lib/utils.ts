type ClassValue = string | number | boolean | null | undefined | ClassValue[]

export function cn(...inputs: ClassValue[]): string {
  return inputs
    .flat(Infinity)
    .filter((x): x is string | number => !!x && typeof x !== "boolean")
    .join(" ")
    .replace(/\s+/g, " ")
    .trim()
}
