const prefix = require('../config/botsettings.json').prefix;
const Discord = require('discord.js');
const toTitleCase = require('../helpers/titleCase');
const getInventory = require('../helpers/getInventory');

function chunkString(str, length) {
	return str.match(new RegExp('.{1,' + length + '}', 'g'));
}

module.exports = {
	name: 'inv',
	description: `List out inventory ${prefix}inv`,
	show: true,
	async execute(message, args) {
		let inventory = await getInventory();
		// generate embed
		let inventoryEmbed = new Discord.RichEmbed();
		inventoryEmbed.setAuthor('Torchbearers Armory', null, null);
		inventoryEmbed.setThumbnail('https://i.imgur.com/XMA6kx7.png');
		Object.keys(inventory).forEach((category) => {
			// create inventory list from items in category array
			let categoryString = "";
			let categoryArray = [];
			if (category == 'Funds') {
				categoryArray = Object.keys(inventory[category]);
			} else {
				categoryArray = Object.keys(inventory[category]).sort()
			}
			categoryArray.forEach((item, ind) => {
				let record = inventory[category][item];
				// if the amount of the item isn't 0 add it to the embed
				if(record.amount) {
					if(record.desc) {
						categoryString += `${toTitleCase(record.name)} (${record.desc}) (${record.amount})${ ind + 1 == Object.keys(inventory[category]).length ? '' : ','} `;
					} else if(!record.desc) {
						categoryString += `${toTitleCase(record.name)} (${record.amount})${ ind + 1 == Object.keys(inventory[category]).length ? '' : ','} `;
					}
				}
			});
			let fields = chunkString(categoryString, 1000);
			fields.forEach((text, ind) => {
				if (ind === 0) {
					inventoryEmbed.addField(toTitleCase(category), text)
				} else {
					inventoryEmbed.addField(`${toTitleCase(category)} (cont.)`, text)
				}
			});
		});
		// send constructed embed to sever channel
		message.channel.send(inventoryEmbed);
	},
};