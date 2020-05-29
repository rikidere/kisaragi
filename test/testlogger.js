const winston = require('winston');
const { isDevelopment, isLogging, loggingLevel, loggerFormatColor, loggerFormat } = require('../config');

const datetime = new Date().toISOString().slice(0, -5).replace(/T/gi, '_').replace(/:/gi, '-');
const logger = winston.createLogger({
	level: loggingLevel,
	format: loggerFormat,
	transports: isLogging ? [
		new winston.transports.Console({ format : loggerFormatColor }),
		new winston.transports.File({ filename: `logs/test_logfile_${datetime}.log` }),
		new winston.transports.File({ filename: `logs/error/test_err_${datetime}.log`, level: 'error' })
	] : [ new winston.transports.Console({ format : loggerFormatColor }) ]
});

logger.error('message');
logger.warn('message');
logger.info('message');
logger.log('verbose', 'message');
logger.log('debug', 'message');
logger.log('silly', 'message');
