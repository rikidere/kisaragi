const Command = require('../structures/Command');
const ch = require('../commandHandler').instance;
const logger = require('../../../logger');

module.exports = class Reload extends Command {
	name = 'reload';
	shortDescprtion = 'reloads a command';
	longDescprtion = 'unloads a command and loads the same command';
	constructor(client) {
		super(client);
		console.log(this.shortDescprtion);
	}
	async run(msg, args) {
		
		msg.reply(message);
	}
}