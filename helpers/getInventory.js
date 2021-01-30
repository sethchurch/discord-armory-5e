const fs = require("fs");
const database = require("./connectDB");

function sleep(ms){
  return new Promise(resolve=>{
      setTimeout(resolve,ms)
  })
}

module.exports = async () => {
  let inventoryData = {
    funds: {},
    weapons: {},
    armor: {},
    other: {}
  };

  database(async db => {
    inventoryData.funds = await db.collection('funds').find({}).toArray();
    inventoryData.weapons = await db.collection('weapons').find({}).toArray();
    inventoryData.armor = await db.collection('armor').find({}).toArray();
    inventoryData.other = await db.collection('other').find({}).toArray();
  });

  await sleep(300);

  let returnData = {
    funds: {},
    weapons: {},
    armor: {},
    other: {}
  };

  for (let category of Object.keys(inventoryData)) {
    for (let item of inventoryData[category]) {
      returnData[category][item.token] = item;
    }
  }

  return new Promise(resolve=>{
    resolve(returnData);
  });
  // return returnData;
};