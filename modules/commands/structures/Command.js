const logger = require('../../../logger');
const { owner } = require('../../../config');
/**
 * @property {string} name - the name of the command, needed
 * @property {string} [shortDescription = ''] - the short description of a command (when using !help), defaults to none
 * @property {string} [longDescription = shortDescription] - the long description of a command (when using !help <command>), defaults to the short description
 * @property {string} [usage - ''] - how the command should be used, default
 * @property {Array[string]} [guilds - ''] - how the command should be used, default
 * @function {void} run - executed when command is called
 */
class Command {
	get name() { throw new Error('command needs a name'); }
	get group() { throw new Error('command needs a group'); }
	get shortDescription() { return ''; }
	get longDescription() { return this.shortDescription; }
	// generate usage string
	get usage() {
		let usage = `${this.name}`;
		this.args.forEach(arg => usage = usage.concat(arg.default || arg.default === '' ? ` [, <${arg.default === '' ? arg.key : `${arg.key}=${arg.default}`}>]` : ` <${arg.key}>`));
		return usage;
	}
	// setting guilds will make the command the command runnable in guild only, guild ids
	get guilds() { return []; }
	// if there are guilds set, the command is guild only by default and if no guilds are set default is false
	get guildOnly() { return this.guilds.length > 0 ? true : false; }
	get ownerOnly() {
		return false;
	}
	get permission() {
		// OWNER will ignore all other permissions
		return [];
	}
	// args handling, see discord.js-commando, every arg gets an object
	get args() {
		return [];
		/*
		example:
		[
			{
				key: string, - used when parsing, required
				multiple: boolean, - default: false - parses the rest of the arguments as one string
				default: '', - default makes the arg optional
				permission: '', - idk if this will be needed
				validate: (arg) => validateTheArg() => void, - default, none
				parse: (arg) => parseTheArg() => parsedArg, - default, none
			}
		]
		*/
	}
	constructor(client) {
		if (!client) throw new Error('no client assigned to command');
		this.client = client;
	}
	// validate args
	validate(args) {
		if(!this.args && args.length > 0) throw new Error('ValidationError: command takes no args');
		this.args.forEach(arg => {
			if(!(args.length > 0 || arg.default || arg.default === '')) throw new Error('ValidationError: not enough arguments');
			// if there are no args, there has to be arg.default
			if(!(args.length > 0)) return;
			// multiple extends to the end of the args, so the entirety of args has to be validated
			try {
				if(arg.multiple) {
					if (arg.validate) arg.validate(args);
					// all args have been validated
					args = [];
					return;
				}
				// shift one arg out and validate
				const currentArg = args.shift();
				if(arg.validate) arg.validate(currentArg);
			} catch (e) {
				throw new Error(`ValidationError: ${e}`);
			}
		});

		if(args.length > 0) throw new Error('ValidationError: too many arguments');
	}

	// parses validated args according to this.args and returns an args object
	parse(args) {
		const newArgs = {};
		this.args.forEach(arg => {
			if(args.length == 0) {
				newArgs[arg.key] = arg.default;
				return;
			}
			if(arg.multiple) {
				let currentArg = args.join(' ');
				if (arg.parse) currentArg = arg.parse(currentArg);
				newArgs[arg.key] = currentArg;
				return;
			}
			logger.debug(arg.key);
			let currentArg = args.shift();
			logger.debug(currentArg);
			if (arg.parse) currentArg = arg.parse(currentArg);
			logger.debug(currentArg);
			newArgs[arg.key] = currentArg;
		});
		return newArgs;
	}
	// check guildOnly, guilds etc ...
	isRunnable(msg) {
		if(!this.guildOnly) return true;
		// msg has to be sent in a guild
		if(msg.channel.type !== 'text') return false;
		// in case a few guilds are set, check if message was sent in one of them
		if(this.guilds.length > 0 && (this.guilds.includes(msg.channel.guild.id))) return true;
		return false;
	}

	// check user permissions
	hasPermission(msg) {
		// check user permissions
		const user = msg.author;
		if (user.id === owner) return true;
		// early exit if command is owner only and user is not owner
		if (this.ownerOnly) return false;
		// if msg wasn't sent in a guild, msg.member is undefined and no further permissions are required
		const member = msg.member;
		if (!member) return true;
		// no permissions needed to run command
		if	(!this.permission) return true;
		return member.hasPermission(this.permission);

	}

	async run() {
		throw new Error('command needs a run method');
	}
}

module.exports = Command;