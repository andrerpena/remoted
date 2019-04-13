export interface FilterData {
  tag?: string;
  query: object;
}

export function linkToJob(publicId: string) {
  return `/job/${encodeURIComponent(publicId)}`;
}

export function linkToTag(tag?: string) {
  if (!tag) {
    return `/`;
  }
  return `/remote-${encodeURIComponent(tag)}-jobs`;
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
