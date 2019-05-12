const presenceUpdateEvent = require('../types/presenceUpdate');

class test extends presenceUpdateEvent {
    run(oldMember, newMember) {
        console.log("===== test =====")
        console.log(oldMember.presence);
        console.log(newMember.presence);
        console.log("")
    }
}

module.exports = test;