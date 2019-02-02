// import { buildDb } from "../server/massive/build-db";
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
// const randomCities = [
//     // North America
//     "New York",
//     "Seattle",
//     "Boston",
//     "Los Angeles",
//     // Latin America
//     "Mexico City",
//     "Sao Paulo",
//     "Rio de Janeiro",
//     "Buenos Aires",
//     // Europe
//     "London",
//     "Berlin",
//     "Amsterdam",
//     "Moscow",
//     "Zurich",
//     "Oslo",
//     "Dublin",
//     // Asia
//     "Tokyo",
//     "Hong Kong",
//     "New Delhi",
// ];
//
// function getRandomArrayItem(array: string[]) {
//     return array[Math.floor(Math.random() * array.length)];
// }
//
// buildDb()
//     .then(async db => {
//         for (let i = 0; i < 5000; i++) {
//             try {
//                 let userName = await userService.getValidUserName(db, stringHelper.normalizeForUrl(faker.internet.userName()));
//                 userName += i;
//                 const email = `${userName}@gmail.com`;
//
//                 const user: serverTypes.User = {
//                     bio: faker.lorem.paragraphs(3, "\n\n"),
//                     status: UserProfileStatus.PENDING_PROFILE_ACTIVATION,
//                     type: UserProfileType.DEVELOPER,
//                     display_name: `${faker.name.firstName()} ${faker.name.lastName()}`,
//                     company_name: faker.company.companyName(),
//                     email,
//                     name: userName,
//                     title: faker.name.jobTitle(),
//                     oauth_profiles: {
//                         linkedin: {
//                             id: `${i + 1}`,
//                             raw: {},
//                         },
//                     },
//                     social_links: {
//                         socialLinks: [{
//                             website: "linkedin",
//                             url: "http://www.linkedin.com",
//                         }],
//                     },
//                     info_groups: null,
//                     photo_url: faker.image.avatar(),
//                     colors: {
//                         headerBackground: "#252934",
//                         headerText: "#FFFFFF",
//                         bodyBackground: "#3073b5",
//                         bodyText: "#FFFFFF",
//                     },
//                     tags: "",
//                     tags_normalized: "",
//                 };
//
//                 // Location
//                 let userLocation = getRandomArrayItem(randomCities);
//                 if (userLocation) {
//                     userLocation = userLocation.replace(" Area", "");
//                     try {
//                         const citiesFormatted = await searchLocationsFormatted(db, userLocation);
//                         const {placeId} = getDataFromFormattedAddress(citiesFormatted[0]);
//                         const location = await db.google_place.findOne({google_place_id: placeId});
//                         if (citiesFormatted && citiesFormatted.length) {
//                             user.google_place_id = location.id;
//                             user.google_place_formatted_address = location.formatted_address;
//                         }
//                     } catch (ex) {
//                         throw Error(`Could not save location ${userLocation}. Error: ${ex}`);
//                     }
//                 }
//
//                 const insertedUser = (await db.user.insert(user)) as serverTypes.User;
//
//
//                 const userProfile = await userService.getUserProfile(db, insertedUser);
//
//                 userProfile.tags = [];
//
//                 const tagCount = Math.floor(Math.random() * 12) + 1;
//
//                 for (var x = 0; x < tagCount; x++) {
//                     const tagSearchResult1 = await tagService.searchTagsFormatted(db, getRandomArrayItem(randomTags));
//                     userProfile.tags.push(getRandomArrayItem(tagSearchResult1));
//                 }
//
//                 await userService.saveProfile(db, insertedUser.id, userProfile, null);
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
