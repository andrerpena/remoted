import Router from "next/router";
import { linkToTag } from "../url";

export function navigateToTag(tag: string) {
  navigateTo(linkToTag(tag), {});
}

export function navigateTo(path: string, query: any) {
  Router.push({
    pathname: path,
    query: query
  });
}
