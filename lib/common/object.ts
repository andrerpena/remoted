export function merge(target: any, ...sources: any[]) {
  for (const source of sources) {
    for (const key of Object.keys(source)) {
      const val = source[key];
      if (val !== undefined && val !== null) {
        target[key] = val;
      }
    }
  }
  return target;
}
