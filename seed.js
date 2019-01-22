const { db } = require("./models");

db.sync({ force: true })
  .then(() => {
    console.log("synced db");
  })
  .catch(error => {
    console.log(error);
  })
  .finally(() => {
    db.close();
  });
