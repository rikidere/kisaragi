const Command = require('../structures/Command');
const ch = require('../commandHandler').instance;
const logger = require('../../../logger');
const { MessageEmbed } = require('discord.js');
const db = require('../../../db.json');
module.exports = class Role extends Command {
	name = 'role';
	group = 'commands';
	shortDescription = 'list and add/remove flavor roles from a member';
	longDescription = 'this command can list or add/remove flavor roles (roles that are self-addable)';
	guilds = ['411858955137187851', '124944592922476546'];
	args = [
		{
			key: 'arg',
			default: 'list',
			multiple: true
			/*
			validate: (arg) => {
			},
			parse: (arg) => {
			}
*/
		}
	];
	constructor(client) {
		super(client);
	}
	async run(msg, args) {
		const reservedKeywords = ['list', 'add', 'remove', 'toggle'];
		args = args.arg.split(' ');
		const subCommand = args[0];
		const reply = [];
		const guild = msg.channel.guild;
		const roles = db.server[guild.id].roles;
		switch(subCommand) {
			case 'list': {
				let result = '';
				roles.forEach(roleId => {
					try {
						result = result.concat(`${result == '' ? ' ' : ', '}\`${guild.roles.cache.get(roleId).name}\``);
					} catch {
						result = result.concat(`${result == '' ? ' ' : ', '}\`<@&${roleId}> not found\``);
					}
				});
				reply.push(result ? `List of available roles: ${result}` : 'No roles are available yet');
				break;
			}
			// role
			default: {
				const roleName = args.join(' ');
				logger.debug(roleName);
				const guildRole = guild.roles.cache.find((role) => role.name.toLowerCase() == roleName.toLowerCase());
				if(!guildRole) {
					reply.push(`\`${roleName}\` not found, see \`role list\` for a list of available roles`);
					break;
				}
				if(!roles.includes(guildRole.id)) {
					reply.push(`\`${guildRole.name}\` cannot be self-added`);
					break;
				}
				// confirm that guildRole is a correct self-addable role
				const member = msg.member;
				if(member.roles.cache.has(guildRole.id)) {
					member.roles.remove(guildRole);
					reply.push(`\`${guildRole.name}\` removed from ${msg.member}`);
				} else {
					member.roles.add(guildRole);
					reply.push(`\`${guildRole.name}\` added to ${msg.member}`);
				}
			}
		}
		msg.channel.send(reply);
	}
};
