import Router from "next/router";
import {
  FilterQuery,
  linkToCompanyCanonical,
  linkToFilters,
  linkToTagCanonical
} from "../common/url";

export function navigateToFilter(filters: FilterQuery) {
  let canonical: string | undefined;
  if (filters.company) {
    canonical = linkToCompanyCanonical(filters);
  } else if (filters.tag) {
    canonical = linkToTagCanonical(filters);
  }
  Router.push(linkToFilters(filters), canonical);
}
