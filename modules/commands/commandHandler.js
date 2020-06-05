const mConfig = require('./moduleConfig');
const { prefix } = require('../../config');
const logger = require('../../logger');
const path = require('path');
const fs = require('fs');
const Command = require('./structures/Command');
class CommandHandler {
	commands = new Map();

	constructor(client) {
		// singleton check
		if (CommandHandler.instance) {
			return CommandHandler.instance;
		}
		CommandHandler.instance = this;
		this.instance = this;
		this.client = client;
		this.groups = mConfig.groups;
		this.prefix = prefix;
		return this;
	}

	loadGroup(group) {
		const normalizedPath = path.join(__dirname, group.path);
		logger.debug(`commandHandler.loadGroup(): called with ${group ? group.name : 'no group name'}`);
		if(!group) throw Error('commandHandler.loadGroup(): no group specified');
		const files = fs.readdirSync(normalizedPath).filter(file => file.endsWith('.js'));

		// file here is a constructor
		files.forEach(file => {
			const filePath = path.join(normalizedPath, file);
			const commandConstructor = require(filePath);
			// logger.debug(typeof commandConstructor); - 'function'
			const command = this.loadCommand(commandConstructor);
			// validate group name
			if(command.group !== group.path) throw new Error('commandHandler().loadGroup(): ValidationError: location of command does not match group');
		});
	}

	/**
	 * @param {group.path} group - ?
	 * @param {function} command - command constructor
	 */
	loadCommand(command) {
		if (!command) throw Error('commandHandler.loadCommand(): command is required');
		if (typeof command !== 'function') throw Error('commandHandler.loadCommand(): command has to be a constructor');
		command = new command(this.client);
		// check if command already loaded
		if (this.commands.has(command.name)) throw Error(`command ${command.name} is already loaded`);

		this.commands.set(command.name, command);
		// returning the command for validation
		return command;
		// find the command file
		/*
		this.groups.forEach((group) => {
			const normalizedPath = path.join(__dirname, group);
			if(`${commandName}.js` in fs.readdirSync(normalizedPath)) {
				const command = new (require(path.join(normalizedPath, commandName)))(this.client);
				return this.commands.set(commandName, { ...command, group });
			}
		});*/
	}

	unloadCommand(command) {
		// yes that's all
		const pathToCommand = path.join(__dirname, command.group, command.name);
		this.commands.delete(command.name);
		delete require.cache[require.resolve(`${pathToCommand}.js`)];
		// return the path as well in case of reloading
		return pathToCommand;
	}

	reloadCommand(command) {
		const pathToCommand = this.unloadCommand(command);
		this.loadCommand(require(pathToCommand));
	}

	// linear algorithm btw O(n+m) (n := #groups, m := #commands, as n <= m ==> O(2m) = O(m))
	getCommandsByGroup() {
		const commandsByGroup = new Map();
		// initialize an entry in the map for each group name and an empty list as value
		this.groups.forEach(group => commandsByGroup.set(group.path, []));
		// get list for the group the command belongs to, push it on the list
		this.commands.forEach((command) => {
			const commandGroup = commandsByGroup.get(command.group);
			commandGroup.push(command);
			commandsByGroup.set(command.group, commandGroup);
		});
		return commandsByGroup;
	}

	init() {
		if (!this.client) throw new Error('commandHandler.init(): no client assigned to commandHandler');
		logger.debug('commandHandler.init(): called');
		this.groups.forEach((group) => this.loadGroup(group));
		// initialize the event listener, move this out in the future
		this.client.on('message', msg => {
			this.handle(msg);
		});
	}

	handle(msg) {
		logger.debug(`msg.content.startsWith(this.client.user.toString()) ${msg.content.startsWith(this.client.user.toString())}`);
		logger.debug(this.client.user.toString());
		if (!(msg.content.startsWith(this.prefix) || this.getUserFromMention(msg.content.split(/ +/)[0])) == this.client.user || msg.author.bot) return;
		logger.debug('commandHandler.init(): message received with command prefix');

		let args = msg.content.startsWith(this.prefix) ? msg.content.slice(this.prefix.length).split(/ +/) : msg.content.split(/ +/).slice(1);
		let command = args.shift();

		if (!this.commands.has(command)) return logger.verbose(`no command found with name ${command}`);
		command = this.commands.get(command);
		try {
			// command has to be available (enabled) > runnable > permission
			if(!command.isRunnable(msg)) return msg.reply('command cannot be run in this channel');
			if(!command.hasPermission(msg)) return msg.reply('you do not have the permission to run this command');
			logger.debug(args.length);
			command.validate(args.slice(0));
			logger.debug(args.length);
			args = command.parse(args.slice());
			logger.debug(args.length);
			logger.debug(JSON.stringify(args));
			command.run(msg, args);
		} catch (e) {
			const reply = [];
			logger.warn(`CommandHandler: error occured while trying to run command with name ${command.name}: ${e}`);
			reply.push(`an error has occured while running the command: ${e}`);
			reply.push(`see \`${this.prefix}${command.usage}\``);
			msg.reply(reply);
		}
	}

	getUserFromMention(mention) {
		if (!mention) return;
		if (mention.startsWith('<@') && mention.endsWith('>')) {
			mention = mention.slice(2, -1);
			if (mention.startsWith('!')) {
				mention = mention.slice(1);
			}
			return this.client.users.cache.get(mention);
		}
	}

}



module.exports = CommandHandler;