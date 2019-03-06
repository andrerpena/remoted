import slugify from "slugify";

export function makeId() {
  let text = "";
  const possible = "abcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

export function generateSlug(text: string) {
  return slugify(text, { remove: /[*+¨~.()\/\\'"!:@]/g }).toLowerCase();
}
