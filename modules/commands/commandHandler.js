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
			logger.debug('C0');
			const command = new (require(filePath))(this.client);
			logger.debug('C1');
			this.commands.set(command.name, command);
			logger.debug('C2');
		});
	}

	init() {
		if (!this.client) throw new Error('commandHandler.init(): no client assigned to commandHandler');
		logger.debug(`commandHandler.init(): called`);
		this.groups.forEach((group) => this.loadGroup(group.path));
		// initialize the event listener
		this.client.on('message', msg => {
			if (!msg.content.startsWith(this.prefix) || msg.author.bot) return;
			logger.debug('commandHandler.init(): message received with command prefix');

			const args = msg.content.slice(this.prefix.length).split(/ +/);
			const command = args.shift();

			if (!this.commands.has(command)) return logger.verbose(`no command found with name ${command}`);

			try {
				this.commands.get(command).run(msg, args);
			} catch (e) {
				logger.Error(`CommandHandler: error occured while to run command with name ${command}: ${e}`);
				msg.reply('an error has occured while running the command');
			}
		});
	}
}

module.exports = CommandHandler;