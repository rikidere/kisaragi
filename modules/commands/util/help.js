const Command = require('../structures/Command');

class Help extends Command {
	name = 'help';
	shortDescprtion = 'displays this'
	longDescprtion = 'displays information about the commands'
	async run() {
		console.log('testing help command');
	}
}