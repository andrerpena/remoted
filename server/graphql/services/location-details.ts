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
    preferred_regions: input.preferredRegions,
    preferred_country_codes: input.preferredCountries,
    preferred_timezone_min: input.preferredTimeZoneMin,
    preferred_timezone_max: input.preferredTimeZoneMax,
    required_regions: input.preferredRegions,
    required_country_codes: input.preferredCountries,
    required_timezone_min: input.preferredTimeZoneMin,
    required_timezone_max: input.preferredTimeZoneMax
  };
}

export function getLocationDetailsFromDbLocationDetails(
  dbLocationDetails: DbLocationDetails
): LocationDetails {
  return {
    raw: dbLocationDetails.raw_text,
    preferredRegions: dbLocationDetails.preferred_regions,
    preferredCountries: dbLocationDetails.preferred_country_codes,
    preferredTimeZoneMin: dbLocationDetails.preferred_timezone_min,
    preferredTimeZoneMax: dbLocationDetails.preferred_timezone_max,
    requiredRegions: dbLocationDetails.preferred_regions,
    requiredCountries: dbLocationDetails.preferred_country_codes,
    requiredTimeZoneMin: dbLocationDetails.preferred_timezone_min,
    requiredTimeZoneMax: dbLocationDetails.preferred_timezone_max
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
