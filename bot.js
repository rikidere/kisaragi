const Discord = require('discord.js');
const { isDevelopment, isLogging, loggingLevel, token } = require('./config');
const logger = require('./logger');
const client = new Discord.Client();
const ModuleHandler = require('./modules/moduleHandler');


/* Logging levels:
error - errors
warn - warnings
info - initialization logging, synchronous stuff
verbose - log events and actions
debug - show even more information on actions and events
silly - uwu?
*/

logger.verbose('Initiliazed logging ...');
logger.verbose(`Logging to files ${isLogging ? 'ENABLED' : 'DISABLED'} with verbosity ${loggingLevel.toUpperCase()}`);
logger.verbose(`Environment is ${isDevelopment ? 'DEVELOPMENT' : 'PRODUCTION'}`);


const mh = new ModuleHandler(client);
logger.verbose('Created module handler');
client.on('ready', () => {
	logger.verbose('Client ready');
	logger.log('info', `Logged in as ${client.user.tag}!`);
	client.user.setActivity('starting up');
	// initialize modules
	logger.verbose('Initializing ModuleHandler...');
	mh.init();
	logger.verbose('Initialized ModuleHandler');
	client.user.setActivity('beta - !help');
});

/* 
temporary streamer role fix
 */
streamerAllowedGuilds = ['411858955137187851', '124944592922476546']
client.on("presenceUpdate", (oldPresence, newPresence) => {
	// check if allowed guild
	if (!streamerAllowedGuilds.includes(newPresence.guild.id)) return;
	var member = newPresence.member;
	var streamerRole = newPresence.guild.roles.cache.find(val => val.name === "Streamers");
	if(!streamerRole) return;

	// add the role when not added when streaming
    if (!newPresence.activities) return false;
    newPresence.activities.forEach(activity => {
        if (activity.type == "STREAMING") {
			logger.debug(`Added Streamer role to ${newPresence.user.tag}`);
			if(!member.roles.cache.has(streamerRole.id)) return member.roles.add(streamerRole);
        };
	});

	// remove the role when added when not streaming
	if (!oldPresence.activities) return false;
    newPresence.activities.forEach(activity => {
        if (activity.type == "STREAMING") {
			logger.debug(`Removed Streamer role from ${newPresence.user.tag}`);
			if(member.roles.cache.has(streamerRole.id)) return member.roles.remove(streamerRole);
        };
    });
});

client.on('error', (e) => logger.log('error', e));
client.on('warn', (w) => logger.log('warn', w));
client.on('debug', (d) => logger.log('debug', d));

client.login(token);
