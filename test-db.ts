import * as sqlite from "sqlite";

const dbPromise = sqlite.open("./db/remoted.sqlite");

(async () => {
  const db = await dbPromise;
  const x = await db.get('select * from "job"');
  console.log(x);
})();

// import sqlite from "sqlite3"
//
// const db = new sqlite.Database("/db/remoted.sqlite");
//
// db.serialize(() => {
//   db.run("select * from \"job\"")
// })

// var sqlite3 = require('sqlite3').verbose();
// var db = new sqlite3.Database(':memory:');
//
// db.serialize(function() {
//   db.run("CREATE TABLE lorem (info TEXT)");
//
//   var stmt = db.prepare("INSERT INTO lorem VALUES (?)");
//   for (var i = 0; i < 10; i++) {
//     stmt.run("Ipsum " + i);
//   }
//   stmt.finalize();
//
//   db.each("SELECT rowid AS id, info FROM lorem", function(_err: any, row: any) {
//     console.log(row.id + ": " + row.info);
//   });
// });
//
// db.close();
