const { db, Gardener, Plot, Vegetable } = require("./models");

const vegetableData = [
  { name: "carrot", color: "orange", planted_on: new Date() },
  { name: "peas", color: "green", planted_on: new Date() }
];
const gardenerData = [{ name: "kyle", age: 23 }, { name: "kris", age: 32 }];
const plotData = [{ size: 10, shaded: true }, { size: 5, shaded: false }];

db.sync({ force: true })
  .then(() => {
    console.log("synced db");
  })
  .then(() => {
    const promiseForVegetables = Vegetable.bulkCreate(vegetableData, {
      returning: true
    });
    const promiseForGardener = Gardener.bulkCreate(gardenerData, {
      returning: true
    });
    const promiseForPlot = Plot.bulkCreate(plotData, { returning: true });
    return Promise.all([
      promiseForVegetables,
      promiseForGardener,
      promiseForPlot
    ]);
  })
  .then(insertedData => {
    const [vegetables, gardeners, plots] = insertedData;
    const [carrot, peas] = vegetables;
    const [kyle, kris] = gardeners;
    const [kylePlot, krisPlot] = plots;

    return Promise.all([
      kyle.setFavoriteVegetable(carrot),
      kylePlot.setGardener(kyle),
      kylePlot.setVegetables([carrot]),

      kris.setFavoriteVegetable(peas),
      krisPlot.setGardener(kris),
      krisPlot.setVegetables([peas])
    ]);
  })
  .then(() => {
    console.log("Database seeded!");
  })
  .catch(error => {
    console.log(error);
  })
  .finally(() => {
    db.close();
  });
