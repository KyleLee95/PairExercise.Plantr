const { db, Gardener, Plot, Vegetable } = require("./models");

const vegetableData = [
  { name: "carrot", color: "orange", planted_on: new Date() },
  { name: "peas", color: "green", planted_on: new Date() }
];

db.sync({ force: true })
  .then(() => {
    console.log("synced db");
  })
  .then(() => {
    const promiseForVegetables = Vegetable.bulkCreate(vegetableData, {
      returning: true
    });
    return Promise.all([promiseForVegetables]);
  })
  .catch(error => {
    console.log(error);
  })
  .finally(() => {
    db.close();
  });
