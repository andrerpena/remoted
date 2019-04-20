// import { config } from "dotenv";
//
// config();
// import { buildDb } from "./server/db/build-db";
// import {
//   buildCompanyCdnImageUrl,
//   uploadCompanyImage
// } from "./server/graphql/services/company-service";
// import { DbCompany } from "./server/db/model";
// import { resizeImage } from "./lib/server/image-processing";
// import { downloadImage } from "./lib/server/storage";
//
// buildDb().then(async db => {
//   const companies = (await db.query(
//     "select id, public_id, image_url from company"
//   )) as DbCompany[];
//   for (let company of companies) {
//     if (company.image_url) {
//       const imageUrl = buildCompanyCdnImageUrl(company.image_url);
//
//       try {
//         const image = await downloadImage(imageUrl);
//         const companyImageBuffer20x20 = await resizeImage(image.buffer, 20);
//         const imageRelativePath20x20 = await uploadCompanyImage(
//           company.public_id,
//           companyImageBuffer20x20,
//           image.contentType,
//           "20x20"
//         );
//
//         console.log("Saving " + company.id);
//         await db.company.save({
//           ...company,
//           ...({
//             image_url_20_20: imageRelativePath20x20
//           } as DbCompany)
//         });
//       } catch (ex) {
//         console.log("Error resizing image");
//         console.error(ex);
//       }
//     }
//   }
// });
