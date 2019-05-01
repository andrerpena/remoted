export const STACKOVERFLOW = "stackoverflow";
export const WE_WORK_REMOTELY = "we-work-remotely";
export const AUTHENTIC_JOBS = "authentic-jobs";

export const sources: { [key: string]: string } = {
  [WE_WORK_REMOTELY]: "WeWorkRemotely",
  [STACKOVERFLOW]: "StackOverflow",
  [AUTHENTIC_JOBS]: "AuthenticJobs"
};

export function isSourceValid(source: string): boolean {
  return Object.keys(sources).includes(source);
}

export function getSourceDisplayName(source: string): string {
  return sources[source];
}
