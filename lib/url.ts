export function buildInternalJobUrl(publicId: string) {
  return `/job/${publicId}`;
}

export function removeQueryString(url: string) {
  return url ? url.split("?")[0] : "";
}

export function extractTagFromPath(path: string): string | null {
  if (!path) {
    return null;
  }
  const match = path.toLowerCase().match(/remote-(.*)-jobs/);
  if (match) {
    return match[1];
  }
  return null;
}
