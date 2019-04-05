import { Request } from "express";

type UrlWithQuery = URL & { query: Record<string, any> };

export function fromExpressRequest(request: Request) {
  // TODO: Make this to look better and add some tests
  const url: Partial<UrlWithQuery> = {
    protocol: request.protocol,
    host: request.hostname,
    pathname: request.path,
    query: request.query
  };
  return url;
}
