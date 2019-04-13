import Router from "next/router";
import { FilterData, linkToTag } from "../common/url";

function cleanQuery(query: any) {
  const queryCopy = { ...query };
  const propNames = Object.getOwnPropertyNames(queryCopy);
  for (let i = 0; i < propNames.length; i++) {
    const propName = propNames[i];
    if (queryCopy[propName] === null || queryCopy[propName] === undefined) {
      delete queryCopy[propName];
    }
  }
  return queryCopy;
}

export function navigateToFilter(filter: FilterData) {
  navigateTo(linkToTag(filter.tag), cleanQuery(filter.query));
}

export function navigateTo(path: string, query: any) {
  Router.push({
    pathname: path,
    query: query
  });
}
