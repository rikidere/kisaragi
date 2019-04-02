module.exports = class Event {
    /**
     * Every event has a name and actions that are taken if it fires
     * the actions can be read from the directory ./events/static/{name}/ on init
     * @param {string} info 
     * @param {function} func 
     */
    constructor(name) {
        if (!name) throw new Error('An event name must be specified')
        if (typeof name !== 'string') throw new TypeError('Event name must be a string.');
        this.name = name;
        console.log("Event constructor fired: " + name)
    }
    
    
    init(client, args){
        if (!client) throw new Error('A client must be specified.');
        this.client = client;
        //this.registerActions(args);
    }

    registerActions(args){
        this.actions = fs.readdirSync(`./static/${name}`).filter(file => file.endsWith('.js'));
        console.log(this.actions);
    }
  }