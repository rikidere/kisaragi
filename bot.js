const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('pong');
  }
});

client.login('NTQ2MjkwMTc0MDcwNDg5MDk4.D0mEpA.lJCU485zUAr_8eUgMwoHInnLu_g');
