import {
  DbCompany,
  DbJob,
  DbLocationDetails,
  DbLocationDetailsInput,
  RemotedDatabase
} from "../../db/model";
import { LocationDetails, LocationDetailsInput } from "../../../graphql-types";

export function getDbLocationDetailsInputFromLocationDetailsInput(
  input: LocationDetailsInput
): DbLocationDetailsInput {
  return {
    raw_text: input.raw,
    regions: input.regions,
    countries: input.countries,
    timezone_min: input.timeZoneMin,
    timezone_max: input.timeZoneMax
  };
}

export function getLocationDetailsFromDbLocationDetails(
  dbLocationDetails: DbLocationDetails
): LocationDetails {
  return {
    raw: dbLocationDetails.raw_text,
    regions: dbLocationDetails.regions,
    countries: dbLocationDetails.countries,
    timeZoneMin: dbLocationDetails.timezone_min,
    timeZoneMax: dbLocationDetails.timezone_max
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
  return getLocationDetailsFromDbLocationDetails(dbLocationDetails);
}
