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

export function normalizeText(input: string) {
  if (!input) {
    return "";
  }
  return input.toLowerCase();
}

export function findInArray(textToFind: string, combinations: string[]) {
  return (
    combinations.findIndex(
      c => normalizeText(textToFind).indexOf(normalizeText(c)) !== -1
    ) !== -1
  );
}

export function flatten(input: string[][]): string[] {
  if (input.length === 0) {
    return [];
  }
  if (input.length === 1) {
    return input[0];
  }
  const flattenedChildren = flatten(input.slice(1, input.length));
  const result: string[] = [];
  for (let item of input[0]) {
    for (let child of flattenedChildren) {
      result.push(item.toLowerCase() + " " + child.toLowerCase());
    }
  }
  return result;
}
