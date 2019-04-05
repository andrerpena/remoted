import { Job } from "../../graphql-types";

export function getLocationText(job: Job) {
  if (job.locationPreferred) {
    return `Preferred: ${job.locationRaw}`;
  }
}

export function getAllCombinations(
  array1: string[],
  array2: string[]
): string[] {
  const result = [];
  for (let i = 0; i < array1.length; i++) {
    for (let j = 0; j < array2.length; j++) {
      result.push(`${array1[i]} ${array2[j]}`);
    }
  }
  return result;
}

export function checkLocation(
  itemsToCheck: string[],
  title: string,
  description: string
): boolean {
  for (let item of itemsToCheck) {
    if (title.toLowerCase().indexOf(item.toLowerCase()) !== -1) {
      return true;
    }
    if (description.toLowerCase().indexOf(item.toLowerCase()) !== -1) {
      return true;
    }
  }
  return false;
}

export function extractLocationTag(
  jobTitle: string,
  jobDescription: string
): string | null {
  const usOnlyTags = ["US", "USA", "U.S.A", "U.S.A", "United States"];
  const northAmericaOnlyTags = ["North America"];
  const europeOnlyTags = ["Europe", "EU", "European Union"];
  const ukOnlyTags = ["UK", "United Kingdom", "England"];

  const suffixes = ["only", "residents", "candidates"];

  const usOnly = checkLocation(
    getAllCombinations(usOnlyTags, suffixes),
    jobTitle,
    jobDescription
  );
  if (usOnly) {
    return "us-only";
  }

  const northAmericaOnly = checkLocation(
    getAllCombinations(northAmericaOnlyTags, suffixes),
    jobTitle,
    jobDescription
  );
  if (northAmericaOnly) {
    return "north-america-only";
  }

  const europeOnly = checkLocation(
    getAllCombinations(europeOnlyTags, suffixes),
    jobTitle,
    jobDescription
  );
  if (europeOnly) {
    return "europe-only";
  }

  const ukOnly = checkLocation(
    getAllCombinations(ukOnlyTags, suffixes),
    jobTitle,
    jobDescription
  );
  if (ukOnly) {
    return "uk-only";
  }

  return null;
}
