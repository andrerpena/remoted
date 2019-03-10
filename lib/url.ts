export function buildRelativeJobUrl(publicId: string) {
  return `/job/${publicId}`;
}

export function removeQueryString(url: string) {
  return url ? url.split("?")[0] : "";
}
