import Router from "next/router";
import { FilterQuery, linkToTag } from "../common/url";

function cleanUpQuery(query: any) {
  const queryCopy = { ...query };
  delete queryCopy["tag"];
  const propNames = Object.getOwnPropertyNames(queryCopy);
  for (let i = 0; i < propNames.length; i++) {
    const propName = propNames[i];
    if (queryCopy[propName] === null || queryCopy[propName] === undefined) {
      delete queryCopy[propName];
    }
  }
  return queryCopy;
}

export function navigateToFilter(filter: FilterQuery) {
  navigateTo(linkToTag(filter.tag), cleanUpQuery(filter));
}

export function navigateTo(path: string, query: any) {
  Router.push({
    pathname: path,
    query: query
  });
}
