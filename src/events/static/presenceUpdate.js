const Event = require('../Event');

module.exports = class presenceUpdateEvent extends Event {
    constructor(client){
        super("presenceUpdate");
        super.init(client);
        //super.registerActions();
    }
}