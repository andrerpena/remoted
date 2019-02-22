import slugify from "slugify";

export function makeId() {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

export function generateSlug(text: string) {
  return slugify(text).toLowerCase();
}

export function generateJobPublicId(jobTitle: string, companyName: string) {
  const id = makeId();
  const jobTitleSlug = generateSlug(jobTitle);
  const companyNameSlug = generateSlug(companyName);
  return `${id}-${jobTitleSlug}-${companyNameSlug}`;
}
