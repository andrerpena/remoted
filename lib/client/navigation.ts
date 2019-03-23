import Router from "next/router";

export function navigateToTag(tag: string) {
  navigateTo(`/remote-${tag}-jobs`, {});
}

export function navigateTo(path: string, query: any) {
  Router.push({
    pathname: path,
    query: query
  });
}
