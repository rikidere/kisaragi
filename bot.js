const Discord = require('discord.js');
const client = new Discord.Client();
const { default_prefix, token, dbUser, dbPassword } = require('./config.json');
const CommandHandler = require('./CommandHandler/CommandHandler');

const ch = new CommandHandler();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  console.log('Building Command Database ...');
  ch.init();

});

client.on('message', msg => {
  ch.handle(msg);
});

client.login(token);
