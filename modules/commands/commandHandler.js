class CommandHandler {
	categoryNames = ['util']

	constructor() {
		// singleton check
		if (CommandHandler.instance) {
			return CommandHandler.instance;
		}
		CommandHandler.instance = this;
		this.instance = this;
		return this;
	}

	loadCategory(categoryName) {
		
	}
	init(client) {
		this.client = client;
	}
}