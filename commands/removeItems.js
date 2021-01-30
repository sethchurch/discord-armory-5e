const prefix = require('../config/botsettings.json').prefix;
const search = require("../helpers/searchInventory");
const normalize = require("../helpers/normalizeString");
const parseItem = require("../helpers/parseItem");
const parseItemString = require("../helpers/parseItemString");
const parseItemArray = require("../helpers/parseItemArray");
const checkDictionary = require("../helpers/checkDictionary");
const getInventory = require("../helpers/getInventory");
const database = require("../helpers/connectDB");

module.exports = {
  name: "remove",
  description: `Remove any number of items to inventory 
                  **Syntax:** ${prefix}remove itemName:amountOfItem 
                  **Example:** ${prefix}remove super plate:2`,
  show: true,
  async execute(message, args) {
    // expected args itemName(desc):amount
    // itemName::String desc::String amount::Number
    let inventory = await getInventory();

    let itemArray = parseItemArray(args);

    for (let item of itemArray) {
      let [name, desc, amount] = parseItemString(item);
      let foundItem = false;
      
      if(!amount || !/^\d+$/.test(amount) || parseInt(amount) < 1)  {
        message.channel.send(`Unable to add "${item}": no amount or invalid amount`);
        return;
      }

      for (let category of Object.keys(inventory)) {
        message.channel.send(JSON.stringify(inventory, null, 2));
        if (foundItem) break;
        if (Object.keys(inventory[category]).includes(normalize(name))) {
          try {
            // if amount would put value below zero put it to zero
            if (inventory[category][normalize(name)].amount - parseInt(amount) < 1) {
              database(async db => {
                await db.collection(category).deleteOne({ token: normalize(name) });
              });
              message.channel.send(
                `You took all of ${name}! Removed item from armory.`
              );
            } else {
              database(async db => {
                await db.collection(category).findOneAndUpdate(
                  { token: normalize(name) },
                  {
                    $inc: { amount: parseInt(amount) * -1 }
                  }
                );
              });
              message.channel.send(
                `Successfully removed ${amount} of ${name}!`
              );
            }
            foundItem = true;
            break;
          } catch (e) {
            message.channel.send(`Unable to remove item ${name} reason: ${e}`);
            break;
          }
        }
      }
      if (!foundItem) {
        message.channel.send(`Could not find ${name}`);
      }
    }
  }
};
