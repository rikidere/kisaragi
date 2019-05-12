const Event = require('../Event');

module.exports = class presenceUpdateEvent extends Event {
    constructor(client){
        super(client, "presenceUpdate");
    }
}