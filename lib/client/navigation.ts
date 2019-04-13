import Router from "next/router";
import { FilterData, linkToTag } from "../common/url";

export function navigateToFilter(filter: FilterData) {
  navigateTo(linkToTag(filter.tag), filter.query);
}

export function navigateTo(path: string, query: any) {
  Router.push({
    pathname: path,
    query: query
  });
}
