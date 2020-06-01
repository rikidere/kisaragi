const Command = require('../structures/Command');
const ch = require('../commandHandler').instance;
const logger = require('../../../logger');

class Help extends Command {
	name = 'help';
	group = 'util';
	shortDescription = 'displays this';
	longDescription = 'displays information about the commands';

	constructor(client) {
		super(client);
	}
	async run(msg, args) {
		// obtain info about commands
		logger.debug(`command handler instance ${ch ? 'found' : 'not found'}`);
		const commands = ch.getCommandsByGroup();
		// eslint-disable-next-line prefer-const
		let message = [];
		commands.forEach((commandGroup, groupName) => {
			message.push(`**${groupName}**`);
			commandGroup.forEach(command => message.push(`${command.name} - ${command.shortDescription}`));
		});
		msg.reply(message);
	}
}

module.exports = Help;