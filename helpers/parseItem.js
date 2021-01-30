const normalize = require('./normalizeString');

module.exports = (name, amount, desc) => {
    return {
        token: normalize(name),
        name: name,
        amount: parseInt(amount),
        desc: desc ? desc : ""
    }
}