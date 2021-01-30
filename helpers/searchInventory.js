const normalize = require("./normalizeString");
const getInventory = require("./getInventory");

module.exports = async query => {
  // get inventory
  let inventory = await getInventory();
  let result = "";
  for (let category of Object.keys(inventory)) {
    if (inventory[category][normalize(query)]) {
      result = category;
      break;
    }
  }
  return result;
};
