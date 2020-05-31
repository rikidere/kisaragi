const Command = require('../structures/Command');

class Help extends Command {
	name = 'help';
	shortDescprtion = 'displays this';
	longDescprtion = 'displays information about the commands';
	constructor(client) {
		super(client);
		console.log(this.shortDescprtion);
	}
	async run(msg, args) {
		msg.reply('test');
	}
}

module.exports = Help;