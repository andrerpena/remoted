export const STACKOVERFLOW = "stackoverflow";
export const WE_WORK_REMOTELY = "we-work-remotely";

export const sources: { [key: string]: string } = {
  [WE_WORK_REMOTELY]: "WeWorkRemotely",
  [STACKOVERFLOW]: "Stackoverflow"
};

export function isSourceValid(source: string): boolean {
  return Object.keys(sources).includes(source);
}

export function getSourceDisplayName(source: string): string {
  return sources[source];
}
