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

	// initialize modules
	logger.verbose('Initializing ModuleHandler...');
	mh.init();
	logger.verbose('Initialized ModuleHandler');
});

client.on('error', (e) => logger.log('error', e));
client.on('warn', (w) => logger.log('warn', w));
client.on('debug', (d) => logger.log('debug', d));
client.on('message', (m) => logger.log('info', m.content));

client.login(token);
