const { Servers, Commands } = require('../db/dbObjects');

console.log(Servers);
Servers.findOne().then((server) => console.log(server.server_id));
Commands.findOne({ where: { server_id : "123" } }).then((command) => console.log(command));
/*
const server = Servers.findOne().then((server) => {
    server.addCommand("test", "test123");
}).catch(console.error);

*/