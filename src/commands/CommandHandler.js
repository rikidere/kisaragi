const fs = require('fs');

class CommandHandler {

    constructor() {
    }

    init(args) {
        //load global/static commands
        const globalCommands = fs.readdirSync('./src/commands/static').filter(file => file.endsWith('.js'));
        //load local commands
        const localCommands; 
        console.log(globalCommands);
    }


    handle(message) {
        
    }
}

module.exports = CommandHandler;