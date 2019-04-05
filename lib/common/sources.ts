export const sources: { [key: string]: string } = {
  "we-work-remotely": "WeWorkRemotely",
  stackoverflow: "Stackoverflow"
};

export function isSourceValid(source: string): boolean {
  return Object.keys(sources).includes(source);
}

export function getSourceDisplayName(source: string): string {
  return sources[source];
}
