const prefix = require('../config/botsettings.json').prefix;
const search = require('../helpers/searchInventory');
const normalize = require('../helpers/normalizeString');
const parseItem = require('../helpers/parseItem');
const parseItemString = require('../helpers/parseItemString');
const parseItemArray = require('../helpers/parseItemArray');
const checkDictionary = require('../helpers/checkDictionary');
const getInventory = require('../helpers/getInventory');
const database = require("../helpers/connectDB");

module.exports = {
  name: "add",
  description: `Add any number of items to inventory 
                **Syntax:** ${prefix}add itemName(itemDescription):amountOfItem 
                **Example:** ${prefix}add super plate(crazy strong plate):2
                Description is not required ex: t!add super plate:2`,
  show: true,
  async execute(message, args) {
    // expected args itemName(desc):amount
    // itemName::String desc::String amount::Number
    let inventory = await getInventory();

    let itemArray = parseItemArray(args);

    for (let item of itemArray) {
      let [name, desc, amount] = parseItemString(item);
      
      // if there isn't an amount supplied or the amount is 0 or less return unable to add item
      if(!amount || !/^\d+$/.test(amount) || parseInt(amount) < 1)  {
        message.channel.send(`Unable to add "${item}": no amount or invalid amount`);
        return;
      }
      // check if the item already exist if so give the category of the item
      let query = await search(name);
      try {
        if(query) {
          // if the item already exist just add the amount to that item entry
          // inventory[query][normalize(name)].amount += parseInt(amount);
          database(async db => {
            await db.collection(query).findOneAndUpdate(
              {token: normalize(name)}, 
              {
                $inc: {amount: parseInt(amount)}
              }
            );
          });
          message.channel.send('Incrimented!')
        } else {
          // otherwise generate a entry and add it to the json with the new data
          let category = checkDictionary(normalize(name.toLowerCase()));
          database(async db => {
            await db.collection(category.toLocaleLowerCase()).insertOne(
              parseItem(name, amount, desc)
            )
          });
          message.channel.send('Added!')
          // inventory[category.toLowerCase()][normalize(name)] = parseItem(name, amount, desc);
        }
      } catch (e) {
        message.channel.send(`Unable to add items to inventory. ${name}: ${e}`);
      }
    };

  }
};
