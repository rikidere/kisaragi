const Command = require('../structures/Command');
const ch = require('../commandHandler').instance;
const logger = require('../../../logger');
module.exports = class Reload extends Command {
	name = 'reload';
	group = 'util';
	shortDescription = 'reloads a command';
	longDescription = 'unloads a command and loads the same command';
	permission = ['ADMINISTRATOR'];
	ownerOnly = true;
	args = [
		{
			key: 'command',
			validate: (command) => {
				// check if command is loaded
				if(ch.commands.has(command)) return;
				throw new Error(`${command} is not loaded`);
			},
			parse: (command) => {
				return ch.commands.get(command);
			}

		}
	];
	constructor(client) {
		super(client);
	}

	async run(msg, args) {
		ch.reloadCommand(args.command);
		msg.reply(`reloaded command ${args.command.name}`);
	}
}