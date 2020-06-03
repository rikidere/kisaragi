const Command = require('../structures/Command');
const ch = require('../commandHandler').instance;
const logger = require('../../../logger');
const { MessageEmbed } = require('discord.js');

class Help extends Command {
	name = 'help';
	group = 'util';
	shortDescription = 'displays this';
	longDescription = 'displays information about the commands';
	args = [
		{
			key: 'command',
			default: '',
			validate: (command) => {
				// check if command is loaded
				if(ch.commands.has(command)) return;
				throw new Error(`${command} not found`);
			},
			parse: (command) => {
				return ch.commands.get(command);
			}
		}
	]
	constructor(client) {
		super(client);
	}
	async run(msg, args) {
		// obtain info about commands
		if (!args.command) {
			logger.debug(`command handler instance ${ch ? 'found' : 'not found'}`);
			const commands = ch.getCommandsByGroup();
			// eslint-disable-next-line prefer-const
			const helpEmbed = new MessageEmbed()
				.setTitle('List of commands')
				.setColor(0xff0000)
				.setDescription(this.longDescription)
				.addField('usage', `\`${ch.prefix}${this.usage}\` or \`@${this.client.user.username} ${this.usage}\``);

			commands.forEach((commandGroup, groupName) => {
				const cl = [];
				commandGroup.forEach(command => cl.push(`**${command.name}** - ${command.shortDescription}`));
				helpEmbed.addField(`**${groupName}**`, cl);
			});
			msg.reply(helpEmbed);
		} else {
			const helpEmbed = new MessageEmbed()
				.setTitle(`${args.command.name}`)
				.setColor(0xff0000)
				.setDescription(args.command.longDescription)
				.addField('usage', `\`${ch.prefix}${args.command.usage}\` or \`@${this.client.user.username} ${args.command.usage}\``);
			msg.reply(helpEmbed);
		}
	}
}

module.exports = Help;