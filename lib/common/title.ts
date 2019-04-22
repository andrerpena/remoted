import { IndexQuery } from "./query-types";

export function getTitleForIndex(options: IndexQuery) {
  if (options.tag) return `Remote ${options.tag} jobs`;
  return "Remote job aggregator for developers and IT professionals";
}

export function getTitleForHire() {
  return "Submit a new job post";
}

export function getTitleForJob() {
  return "Remote job";
}
