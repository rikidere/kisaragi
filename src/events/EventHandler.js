const fs = require('fs');
/**
 *
 */
class EventHandler {
    /**
     * Loads in all events and their corresponding executions
     * @param {json} args
     */
    constructor(){
        //read all event files
        
        
    }
    init(client, args){
        const eventFiles = fs.readdirSync('./src/events/static').filter(file => file.endsWith('.js'));
        this.events = [];
        console.log(eventFiles);
        //initialize all events and add to eventlist
        for(const file of eventFiles){
            console.log(file);
            const Event = require(`./static/${file}`);
            console.log(Event);
            console.log(this.events);
            const event = new Event(client);
            this.events.push(event);
        }
        console.log(this.events);
    }
    /**
     * starts the event listeners
     * @param {Discord.Client} client
     */
    start(client){
        
    }
}

module.exports = EventHandler;