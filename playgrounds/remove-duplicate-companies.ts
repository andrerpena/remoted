// import { config } from "dotenv";
//
// config();
// import { buildDb } from "./server/db/build-db";
// import { RemotedDatabase } from "./server/db/model";
//
// buildDb().then(async db => {
//   const duplicateCompanies = await getDuplicateCompanies(db);
//   for (let company of duplicateCompanies) {
//     const duplicateCompanies = await getCompaniesByDisplayName(db, company.display_name);
//     if (duplicateCompanies.length < 2) {
//       throw new Error("Company is not duplicate" + " " + company.display_name);
//     }
//     // transfer to
//     const target = duplicateCompanies[0];
//     for (let otherIndex = 1; otherIndex < duplicateCompanies.length; otherIndex++) {
//       await transferJobs(db, duplicateCompanies[otherIndex].id, target.id);
//       console.log("transfer complete");
//     }
//   }
//
// });
//
// //@ts-ignore
// async function transferJobs(db: RemotedDatabase, companyFrom: number, companyTo: number) {
//   await db.query("update job set company_id = $1 where company_id = $2", [companyTo, companyFrom]);
// }
//
// //@ts-ignore
// async function getDuplicateCompanies(db: RemotedDatabase) {
//   return db.query("select display_name, count(*) from company group by display_name having count(*) > 1");
// }
//
// async function getCompaniesByDisplayName(db: RemotedDatabase, name: string) {
//   return db.query("select id from company where display_name = $1", [name]);
// }
