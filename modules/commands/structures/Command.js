const logger = require('../../../logger');

/**
 * @property {string} name - the name of the command, needed
 * @property {string} [shortDescription = ''] - the short description of a command (when using !help), defaults to none
 * @property {string} [longDescription = shortDescription] - the long description of a command (when using !help <command>), defaults to the short description
 * @property {string} [usage - ''] - how the command should be used, default
 * @function {void} run - executed when command is called
 */
class Command {
	get name() { throw new Error('command needs a name'); }
	get group() { throw new Error('command needs a group'); }
	get shortDescription() { return ''; }
	get longDescription() { return this.shortDescription; }
	get usage() { return ''; }
	// args handling, see discord.js-commando, every arg gets an object
	get args() {
		return [];
		/*
		example:
		[
			{
				key: string, - used when parsing, required
				multiple: boolean, - default: false - parses the rest of the arguments as one string
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
		if(!this.args && args) throw new Error('ValidationError: command takes no args');
		this.args.forEach(arg => {
			if(!args) throw new Error('ValidationError: not enough arguments');
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
			if(arg.multiple) {
				let currentArg = args.join();
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
	async run() {
		throw new Error('command needs a run method');
	}

}

module.exports = Command;