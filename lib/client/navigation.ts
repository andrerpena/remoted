import Router from "next/router";
import { FilterQuery, linkToFilters, linkToTagCanonical } from "../common/url";

export function navigateToFilter(filters: FilterQuery) {
  Router.push(linkToFilters(filters), linkToTagCanonical(filters));
}
