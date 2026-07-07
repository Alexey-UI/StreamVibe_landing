type ClassValue = string | false | null | undefined

/** Joins CSS Module class names, dropping falsy values. */
export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(' ')
}
