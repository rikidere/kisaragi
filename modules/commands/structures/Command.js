/**
 * @property {string} name - the name of the command, needed
 * @property {string} [shortDescription = ''] - the short description of a command (when using !help), defaults to none
 * @property {string} [longDescription = shortDescription] - the long description of a command (when using !help <command>), defaults to the short description
 * @property {string} [usage - ''] - how the command should be used, default
 * @function {void} run - executed when command is called
 */
class Command {
	get name() { throw new Error('command needs a name'); }
	get shortDescription() { return ''; }
	get longDescription() { return this.shortDescription; }
	get usage() { return ''; }

	constructor(client) {
		if (!client) throw new Error('no client assigned to command');
		this.client = client;
	}
	async run() {
		throw new Error('command needs a run method');
	}
}

module.exports = Command;