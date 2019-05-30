import { IndexQuery } from "./query-types";
import {
  AUTHENTIC_JOBS,
  getSourceDisplayName,
  REMOTE_OK,
  STACKOVERFLOW,
  WE_WORK_REMOTELY
} from "./sources";
import { naturalJoin } from "./array";
import { toTitleCase } from "./tags";

export const getSearchTagLineFor = (query: Partial<IndexQuery>) => {
  const prefix = query.tag
    ? `Remote ${toTitleCase(query.tag)} jobs`
    : `All remote jobs`;
  let parts: string[] = [];
  let sourceDetails: string[] = [];
  let locationDetails: string[] = [];
  if (query.anywhere) {
    parts.push("you can work anywhere");
  }
  if (query.salary) {
    parts.push("with salary details");
  }
  // sources
  if (query.stackoverflow) {
    sourceDetails.push(getSourceDisplayName(STACKOVERFLOW));
  }
  if (query.remoteok) {
    sourceDetails.push(getSourceDisplayName(REMOTE_OK));
  }
  if (query.weworkremotely) {
    sourceDetails.push(getSourceDisplayName(WE_WORK_REMOTELY));
  }
  if (query.authenticjobs) {
    sourceDetails.push(getSourceDisplayName(AUTHENTIC_JOBS));
  }
  // locations
  if (query.noeuropeonly) {
    locationDetails.push("Europe only");
  }
  if (query.nonorthamericaonly) {
    locationDetails.push("North America only");
  }
  if (query.nousonly) {
    locationDetails.push("US only");
  }

  if (!parts.length && !sourceDetails.length && !locationDetails.length) {
    return prefix;
  }

  // anywhere and salary
  if (sourceDetails.length) {
    if (sourceDetails.length === 1) {
      parts.push(`from ${sourceDetails[0]}`);
    } else {
      parts.push(`from sources: ${naturalJoin(sourceDetails)}`);
    }
  }
  if (locationDetails.length) {
    parts.push(`excluding ${naturalJoin(locationDetails)} jobs`);
  }
  return `${prefix} ${naturalJoin(parts)}`;
};
