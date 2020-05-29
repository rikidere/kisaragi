const Discord = require('discord.js');
const winston = require('winston');
const { isDevelopment, isLogging, loggingLevel, token, loggerFormatColor, loggerFormat } = require('./config');
const client = new Discord.Client();

const datetime = new Date().toISOString().slice(0, -5).replace(/T/gi, '_').replace(/:/gi, '-');
const logger = winston.createLogger({
	format: loggerFormat,
	level: loggingLevel,
	transports: isLogging ? [
		new winston.transports.Console({ format : loggerFormatColor }),
		new winston.transports.File({ filename: `logs/logfile_${datetime}.log` }),
		new winston.transports.File({ filename: `logs/error/err_${datetime}.log`, level: 'error' })
	] : [ new winston.transports.Console({ format : loggerFormatColor }) ]
});


client.on('ready', () => {
	logger.log('info', `Logged in as ${client.user.tag}!`);
	logger.log('error', 'test');
});

client.on('error', (e) => logger.log('error', e));
client.on('warn', (w) => logger.log('warn', w));
client.on('debug', (d) => logger.log('debug', d));
client.on('message', (m) => logger.log('info', m.content));

client.login(token);
