const dictionary = require("../config/itemDictionary");

module.exports = name => {
    let type = 'other';
    let found = false;
    
    for (let category of Object.keys(dictionary)) {
        // if the item matches a dictionary entry return the category of that item
        if (category.includes(name)) {
            type = category;
            found = true;
            break;
        }
        // if the name of the item includes any of the dictionary items give the category
        if (!found) {
            for (let itemName of dictionary[category]) {
                if (name.includes(itemName)) {
                    type = category;
                    found = true;
                    break;
                }
            }
        }
    }
    
    return type;
}