const fs = require('fs');

class CommandHandler {

    CommandHandler() {
    }

    init(args) {
        const commandFiles = fs.readdirSync('./CommandHandler/commands').filter(file => file.endsWith('.js'));
        const commandDb
        console.log(commandFiles);
    }


    handle(message) {

    }
}

module.exports = CommandHandler;