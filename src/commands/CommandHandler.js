const fs = require('fs');

class CommandHandler {

    CommandHandler() {
    }

    init(args) {
        const globalCommands = fs.readdirSync('./commands/global').filter(file => file.endsWith('.js'));
        const commandDb;
        console.log(globalCommands);
    }


    handle(message) {
        
    }
}

module.exports = CommandHandler;