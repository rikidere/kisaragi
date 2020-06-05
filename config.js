const winston = require('winston');

const colorizer = winston.format.colorize();
const isDevelopment = process.env.NODE_ENV !== 'production';
const isLogging = isDevelopment ? process.argv.includes('--log') : true;
const loggingLevel = process.argv.includes('--silly') ? 'silly' :
	process.argv.includes('--debug') ? 'debug' :
		process.argv.includes('--verbose') || process.argv.includes('-v') ? 'verbose' : 'info';

const loggerFormatColor = winston.format.combine(
	winston.format.simple(),
	winston.format.label({
		label:'LOGGER'
	}),
	winston.format.timestamp({
		format:'YYYY-MM-DD HH:MM:SS'
	}),
	winston.format.printf(
		info => {
			const padding = info.level.length <= 9 ? 9 : 17;
			const level = `[${info.level.toUpperCase()}]`;
			return colorizer.colorize(info.level, `[${info.label}] [${info.timestamp}] ${level.padEnd(padding, ' ')} ${info.message}`);
		}
	)
);
const loggerFormat = winston.format.combine(
	winston.format.simple(),
	winston.format.label({
		label:'LOGGER'
	}),
	winston.format.timestamp({
		format:'YYYY-MM-DD HH:MM:SS'
	}),
	winston.format.printf(
		info => {
			const padding = info.level.length <= 9 ? 9 : 17;
			const level = `[${info.level.toUpperCase()}]`;
			return `[${info.label}] [${info.timestamp}] ${level.padEnd(padding, ' ')} ${info.message}`;
		}
	)
);


module.exports = { isDevelopment, isLogging, loggingLevel, owner: process.env.OWNER, prefix: process.env.COMMAND_PREFIX, token: process.env.DISCORD_TOKEN, loggerFormatColor, loggerFormat };