module.exports = itemString => {
    let name, desc, amount = null;
    // parse string and get name, description, and amount
    if(itemString.includes('(')) {
        [name, desc, amount] = itemString.split(/[(:]+/);
        desc = desc.slice(0, desc.length - 1)
    } else {
        [name, amount] = itemString.split(/[:]+/);
    }
    return [name, desc, amount];
}