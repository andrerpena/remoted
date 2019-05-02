const excludeList = ["on", "in", "of", "at"];

export const toTitleCase = (tag: string) => {
  if (!tag) {
    return tag;
  }
  return tag
    .toLowerCase()
    .split("-")
    .map(s =>
      excludeList.indexOf(s) !== -1
        ? s
        : s.charAt(0).toUpperCase() + s.substring(1)
    )
    .join("-");
};
