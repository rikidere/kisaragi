const discord = require('discord.js')
module.exports = class Event {
    /**
     * @typedef {Object} EventInfo
     * @property {string} name
     * @property {string} 
     */
    /**
     * Every event has a name and actions that are taken if it fires
     * the actions can be read from the directory ./events/static/{name}/ on init
     * @param {client} client - the discord client the event is for
     * @param {EventInfo} info - information to construct the event
     */
    constructor(client, name) {
        if (!name) throw new Error('An event name must be specified')
        if (typeof name !== 'string') throw new TypeError('Event name must be a string.')
        this.name = name;

        if (!client) throw new Error('No Client specified')
        this.client = client;
        console.log("Event constructor fired: " + name)
    }

    hasPermission(){
        throw new Error('hasPermission() empty');
    }

    isEnabled(){
        throw new Error('isEnabled() empty');
    }

    isEnabledIn(){
        throw new Error('isEnabledIn() empty')
    }

    isUsable(){
        throw new Error('isEnabled() empty')
    }

    run (oldMember, newMember) {
        throw new Error("run() not specified");
    }
  }