import { PAGE_SIZE } from "./constants";

export function isThereMore(
  jobs: any[],
  pageSize: number = PAGE_SIZE
): boolean {
  return jobs.length > pageSize && jobs.length % pageSize === 1;
}

export function filterPageData(jobs: any[], pageSize: number = PAGE_SIZE) {
  if (isThereMore(jobs, pageSize)) {
    return jobs.slice(0, PAGE_SIZE);
  }
  return jobs;
}
