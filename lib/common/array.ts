/**
 * Joins an array of strings in natural language
 */
export function naturalJoin(
  items: string[],
  conjunction: string = "and"
): string {
  if (!items) {
    return "";
  }
  if (items.length === 1) {
    return items[0];
  }
  if (items.length === 2) {
    return `${items[0]} ${conjunction} ${items[1]}`;
  }
  return `${items.slice(0, items.length - 1).join(", ") +
    ` ${conjunction} ` +
    items[items.length - 1]}`;
}
