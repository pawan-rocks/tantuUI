/**
 * Lightweight class name joiner.
 * Filters falsy values and joins with a space.
 *
 * cn("foo", false && "bar", "baz") → "foo baz"
 *
 * If you add `clsx` or `tailwind-merge` later, swap the implementation here.
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}
