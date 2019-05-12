const fs = require('fs');
const Discord = require('discord.js');
//const Event = require('./Event.js');
/**
 * EventHandler initializes (all possible) events in ./static/${eventName} with their respective
 * event type in ./static/ (this is mostly for checking)
 */
class EventHandler {
    /**
     * Loads in all events and their corresponding executions
     * @param {Discord.Client} client
     * @param {Discord.Collection} events
     * @param
     */


    constructor(){
    }

    /**
     * starts the event listeners
     * @argument {Discord.Client} client
     */
    init(client, args){
        //TODO: just read and put all events in list (NOT THE TYPES)
        let eventFiles = fs.readdirSync('./src/events/static').filter(file => file.endsWith('.js'));
        console.log(eventFiles);

        for(const file of eventFiles) {
            const event = require(`./static/${file}`);
            const eventI = new event(client);
            client.on(eventI.name, eventI.run);
            console.log(`${eventI.name} listener started of function: ${file}`);
        }
    }
}

module.exports = EventHandler;