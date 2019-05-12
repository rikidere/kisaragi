const fs = require('fs');

class CommandHandler {
    /**
     * Loads all static commands and local commands
     * @param {Command[]} globalCommands
     */
    constructor() {
        
    }

    init(args) {
        //load global/static commands
        this.globalCommands = fs.readdirSync('./src/commands/static').filter(file => file.endsWith('.js'));
        //load local commands
        const localCommands; 
        console.log(globalCommands);
    }


    handle(message) {
        
    }
}

module.exports = CommandHandler;