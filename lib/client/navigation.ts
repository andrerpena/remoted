import Router from "next/router";
import { FilterData, linkToTag } from "../common/url";

const toKebabCase = str =>
  str &&
  str
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map(x => x.toLowerCase())
    .join("-");

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
