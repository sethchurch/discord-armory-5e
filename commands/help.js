const Discord = require('discord.js');
const toTitleCase = require('../helpers/titleCase');
const fs = require('fs');
let commands = [];
let normalizedPath = require("path").join(__dirname, "../commands");
require("fs").readdirSync(normalizedPath).forEach(function(file) {
  if(require("../commands/" + file).name && require("../commands/" + file).show) {
    commands.push(require("../commands/" + file));
  }
});

module.exports = {
	name: 'help',   
  description: 'List out comands and such t!help',
  show: true,
	execute(message, args) {
        let helpEmbed = new Discord.RichEmbed();
        helpEmbed.setAuthor('List of commands', null, null);
        helpEmbed.addField(toTitleCase(this.name), this.description);
        for (command of commands) {
            helpEmbed.addField(toTitleCase(command.name), command.description);
        }
        message.channel.send(helpEmbed);
	}
};