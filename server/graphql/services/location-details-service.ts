import {
  DbCompany,
  DbJob,
  DbLocationDetails,
  RemotedDatabase
} from "../../db/model";
import { LocationDetails } from "../../../graphql-types";

export function getLocationDetailsFromDbLocationDetails(
  dbLocationDetails: DbLocationDetails
): LocationDetails {
  return {
    description: dbLocationDetails.description,
    acceptedRegions: dbLocationDetails.accepted_regions,
    acceptedCountries: dbLocationDetails.accepted_countries,
    timeZoneMin: dbLocationDetails.timezone_min,
    timeZoneMax: dbLocationDetails.timezone_max,
    headquartersLocation: dbLocationDetails.headquarters_location,
    worldwideConfirmed: dbLocationDetails.worldwide_confirmed
  };
}

export async function getLocationDetailsForJob(
  db: RemotedDatabase,
  jobPublicId: string
): Promise<LocationDetails | null> {
  const dbJob = (await db.job.findOne({
    public_id: jobPublicId
  } as Partial<DbJob>)) as DbJob;
  if (!dbJob) {
    return null;
  }
  const dbLocationDetails = await db.location_details.findOne({
    id: dbJob.location_details_id
  } as Partial<DbLocationDetails>);
  if (!dbLocationDetails) {
    return null;
  }
  return getLocationDetailsFromDbLocationDetails(dbLocationDetails);
}

export async function getLocationDetailsForCompany(
  db: RemotedDatabase,
  companyPublicId: string
): Promise<LocationDetails | null> {
  const dbCompany = (await db.company.findOne({
    public_id: companyPublicId
  } as Partial<DbCompany>)) as DbCompany;
  if (!dbCompany) {
    return null;
  }
  const dbLocationDetails = await db.location_details.findOne({
    id: dbCompany.location_details_id
  } as Partial<DbLocationDetails>);
  if (!dbLocationDetails) {
    return null;
  }
  return getLocationDetailsFromDbLocationDetails(dbLocationDetails);
}
