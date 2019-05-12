const Discord = require('discord.js');
const client = new Discord.Client();

const { default_prefix, token, dbUser, dbPassword } = require('./config.json');
//const CommandHandler = require('./src/commands/CommandHandler');
const EventHandler = require('./src/events/EventHandler');



//const commandHandler = new CommandHandler();
const eventHandler = new EventHandler();
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  console.log('Building Command Database ...');
  //commandHandler.init();
  eventHandler.init(client);
});

client.on('error', (e) => console.error(e));
client.on('warn', (w) => console.warn(w));
client.on('debug', (d) => console.info(d));
client.on('message', (msg) => commandHandler.handle(msg));

client.login(token);
