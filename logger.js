const winston = require('winston');
const { isLogging, loggingLevel, loggerFormatColor, loggerFormat } = require('./config');
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

module.exports = logger;