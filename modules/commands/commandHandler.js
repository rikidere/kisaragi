const mConfig = require('./moduleConfig');
const { prefix } = require('../../config');
const logger = require('../../logger');
const path = require('path');
const fs = require('fs');

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

	loadGroup(groupName) {
		const normalizedPath = path.join(__dirname, groupName);
		logger.debug(`commandHandler.loadGroup(): called with ${groupName ? groupName : 'no group name'}`);
		const files = fs.readdirSync(normalizedPath).filter(file => file.endsWith('.js'));

		files.forEach(file => {
			const filePath = path.join(normalizedPath, file);
			const command = new (require(filePath))(this.client);
			this.commands.set(command.name, { groupName, command });
		});
	}

	// commandName has to be the same as the fileName
	// throws Error when command is already loaded
	// throws Error when the command is not found
	loadCommand(commandName) {
		// check if command already loaded
		if(this.commands.has(commandName)) throw Error(`command ${commandName} is already loaded`);
		// find the command file
		this.groups.forEach((group) => {
			const normalizedPath = path.join(__dirname, group);
			if(`${commandName}.js` in fs.readdirSync(normalizedPath)) {
				const command = new (require(path.join(normalizedPath, commandName)))(this.client);
				return this.commands.set(commandName, { group, command });
			}
		});
		throw Error(`command ${commandName} not found`);
	}

	unloadCommand(commandName) {
		delete require.cache[require.resolve(`./${commandName}.js`)];
		
	}

	// linear algorithm btw O(n+m) (n := #groups, m := #commands, as n <= m ==> O(2m) = O(m))
	getCommandsByGroup() {
		const commandsByGroup = new Map();
		// initialize an entry in the map for each group name and an empty list as value
		this.groups.forEach(group => commandsByGroup.set(group.name, []));
		// get list for the group the command belongs to, push it on the list
		this.commands.forEach(({ groupName, command }) => {
			const commandGroup = commandsByGroup.get(groupName);
			commandGroup.push(command);
			commandsByGroup.set(groupName, commandGroup);
		});
		return commandsByGroup;
	}

	init() {
		if (!this.client) throw new Error('commandHandler.init(): no client assigned to commandHandler');
		logger.debug('commandHandler.init(): called');
		this.groups.forEach((group) => this.loadGroup(group.path));
		// initialize the event listener
		this.client.on('message', msg => {
			if (!msg.content.startsWith(this.prefix) || msg.author.bot) return;
			logger.debug('commandHandler.init(): message received with command prefix');

			const args = msg.content.slice(this.prefix.length).split(/ +/);
			const command = args.shift();

			if (!this.commands.has(command)) return logger.verbose(`no command found with name ${command}`);

			try {
				this.commands.get(command).command.run(msg, args);
			} catch (e) {
				logger.Error(`CommandHandler: error occured while to run command with name ${command}: ${e}`);
				msg.reply('an error has occured while running the command');
			}
		});
	}
}

module.exports = CommandHandler;