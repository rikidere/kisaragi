const Command = require('../structures/Command');
const ch = require('../commandHandler').instance;
const logger = require('../../../logger');
const { MessageEmbed } = require('discord.js');

module.exports = class Ctb extends Command {
	name = 'ctb';
	group = 'osc';
	shortDescription = 'Add/remove the ctb channel role';
	longDescription = 'Running the command will add or remove the ctb role from the user, which grants or revokes access to the ctb channel';
	guilds = ['411858955137187851', '124944592922476546'];
	constructor(client) {
		super(client);
	}
	async run(msg, args) {

		if(!this.isRunnable(msg)) msg.reply('message cannot be run here');
		msg.reply('this is a test');
	}
};

