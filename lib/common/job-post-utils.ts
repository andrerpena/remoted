export function isJobPostTooOld(date: Date): boolean {
  const maxAge = 1000 * 60 * 60 * 24 * 21;
  return new Date().getTime() - date.getTime() > maxAge;
}
