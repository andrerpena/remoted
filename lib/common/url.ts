export interface FilterQuery {
  // filters
  filters?: boolean;
  // tag
  tag?: string;
  // salary
  salary?: boolean;
  // region
  anywhere?: boolean;
  nousonly?: boolean;
  nonorthamericaonly?: boolean;
  noukonly?: boolean;
  noeuropeonly?: boolean;
  // sources
  stackoverflow?: boolean;
  authenticjobs?: boolean;
  weworkremotely?: boolean;
  // company
  company?: string;
}

export const buildQuery = function(data: { [key: string]: any }) {
  // Create a query array to hold the key/value pairs
  const query = [];
  // Loop through the data object
  for (let key in data) {
    if (data.hasOwnProperty(key)) {
      // Encode each key and value, concatenate them into a string, and push them to the array
      query.push(encodeURIComponent(key) + "=" + encodeURIComponent(data[key]));
    }
  }
  // Join each item in the array with a `&` and return the resulting string
  return query.join("&");
};

export function cleanUpFilters(
  query: any,
  excludeTag: boolean,
  excludeCompany: boolean
) {
  const queryCopy = { ...query };
  if (excludeTag) {
    delete queryCopy["tag"];
  }
  if (excludeCompany) {
    delete queryCopy["company"];
  }
  const propNames = Object.getOwnPropertyNames(queryCopy);
  for (let i = 0; i < propNames.length; i++) {
    const propName = propNames[i];
    if (
      queryCopy[propName] === null ||
      queryCopy[propName] === undefined ||
      queryCopy[propName] === false
    ) {
      delete queryCopy[propName];
    }
  }
  return queryCopy;
}

export function linkToJob(slug: string) {
  return `/job?publicId=${encodeURIComponent(slug)}`;
}

export function linkToJobCanonical(slug: string) {
  return `/job/${slug}`;
}

export function linkToFilters(filters?: FilterQuery) {
  if (!filters) {
    return `/`;
  }
  return `/?${buildQuery(cleanUpFilters(filters, false, false))}`;
}

export function linkToTagCanonical(filters?: FilterQuery) {
  if (!filters || !filters.tag) {
    return linkToFilters(filters);
  }
  const query = buildQuery(cleanUpFilters(filters, true, true));
  return `/remote-${encodeURIComponent(filters.tag)}-jobs${
    query ? `?${query}` : ""
  }`;
}

export function linkToCompanyCanonical(filters?: FilterQuery) {
  if (!filters || !filters.company) {
    return linkToFilters(filters);
  }
  const query = buildQuery(cleanUpFilters(filters, true, true));
  return `/companies/${encodeURIComponent(filters.company)}${
    query ? `?${query}` : ""
  }`;
}

export function removeQueryString(url: string) {
  return url ? url.split("?")[0] : "";
}

export function extractTagFromPath(path: string): string | null {
  if (!path) {
    return null;
  }
  const match = path.toLowerCase().match(/remote-(.*)-jobs/);
  if (match) {
    return match[1];
  }
  return null;
}
