const winston = require('winston');
const { isLogging, loggingLevel, loggerFormatColor, loggerFormat } = require('./config');
const datetime = new Date().toISOString().slice(0, -5).replace(/T/gi, '_').replace(/:/gi, '-');
const logger = winston.createLogger({
	format: loggerFormat,
	level: loggingLevel,
	transports: isLogging ? [
		new winston.transports.Console({ format: loggerFormatColor, handleExceptions: true }),
		new winston.transports.File({ filename: `logs/logfile_${datetime}.log`, handleExceptions: true }),
		new winston.transports.File({ filename: `logs/error/err_${datetime}.log`, level: 'error', handleExceptions: true })
	] : [ new winston.transports.Console({ format : loggerFormatColor, handleExceptions: true }) ]
});

module.exports = logger;