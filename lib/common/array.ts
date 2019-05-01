/**
 * Joins an array of strings in natural language
 * @param items
 */
export function naturalJoin(items: string[]): string {
  if (!items) {
    return "";
  }
  if (items.length === 1) {
    return items[0];
  }
  if (items.length === 2) {
    return `${items[0]} and ${items[1]}`;
  }
  return `${items.slice(0, items.length - 1).join(", ") +
    " and " +
    items[items.length - 1]}`;
}
