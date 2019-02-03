// import { buildDb } from "../server/db/build-db";
//
// const randomTags = [
//     // .NET
//     "c#",
//     ".net",
//     "entity-framework",
//     "asp.net",
//     // JavaScript
//     "javascript",
//     "typescript",
//     "es2015",
//     "react",
//     "angular",
//     "vue",
//     // Data science
//     "machine-learning",
//     "tensorflow",
//     "matplotlib",
//     "pandas",
//     "python",
//     // Languages
//     "ruby-on-rails",
//     "pascal",
//     "go",
//     "ruby",
//     "kotlin",
// ];
//
// function getRandomArrayItem(array: string[]) {
//     return array[Math.floor(Math.random() * array.length)];
// }
//
// buildDb()
//     .then(async db => {
//         for (let i = 0; i < 100; i++) {
//             try {
//
//             }
//             catch (ex) {
//                 console.log("error");
//                 throw ex;
//             }
//             console.log("Person saved " + i);
//         }
//
//
//     })
//     .then(() => {
//         process.exit();
//     })
//     .catch((error) => console.log(error));
