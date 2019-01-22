const { db, Gardener, Plot, Vegetable } = require("./models");

const vegetableData = [
  { name: "carrot", color: "orange", planted_on: new Date() },
  { name: "peas", color: "green", planted_on: new Date() }
];
const gardenerData = [
  { name: "kyle", age: 23 },
  { name: "kris", age: 32 }
];
const plotData = [
  { size: 10, shaded: true },
  { size: 5, shaded: false }
];

db.sync({ force: true })
  .then(() => {
    console.log("synced db");
  })
  // .then(() => {
  //   const promiseForVegetables = Vegetable.bulkCreate(vegetableData, {
  //     returning: true
  //   });
  //   const promiseForGardener = Gardener.bulkCreate(gardenerData, {returning: true})
  //   const promiseForPlot = Plot.bulkCreate(plotData, {returning: true})
  //   return Promise.all([promiseForVegetables, promiseForGardener, promiseForPlot]);
  // })
  // .then((insertedData) => {
  //   const [vegetable, gardener, plot] = insertedData
  //   const [vegetable, plot] = 
  //   const [gardener, vegetable] = 
  //   const [gardener, plot] = 
  // })
  .then(() => {
    // const GardenerPlot = db.model('')
    const PlotVegetable = db.model('vegetable_plot')
    const VegetablePlot = db.model('vegetable_plot')
    // const VegetableGardener = db.model('favorite_vegetable')
    return Promise.all([PlotVegetable, VegetablePlot])
  })
  .catch(error => {
    console.log(error);
  })
  .finally(() => {
    db.close();
  });
