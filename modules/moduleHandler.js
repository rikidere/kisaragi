const logger = require('../logger');
const path = require('path');
const fs = require('fs');

class ModuleHandler {
	modules = new Map();

	constructor(client) {
		// singleton check
		if (ModuleHandler.instance) {
			return ModuleHandler.instance;
		}
		ModuleHandler.instance = this;
		this.instance = this;
		this.client = client;
		return this;
	}

	loadModule(moduleName) {
		if (!this.instance) throw new Error('ModuleHandler.loadModule(): ModuleHandler not initialized.');
		if (!moduleName) throw new Error('ModuleHandler.loadModule(): no moduleName supplied.');
		if (typeof moduleName !== 'string') throw new Error('ModuleHandler.loadModule(): moduleName is not a string.');
		if (moduleName in this.modules) return logger.warn('ModuleHandler.loadModule(): module already loaded. Maybe you meant reloading?');
		let module;
		try {
			const normalizedPath = path.join(__dirname, moduleName);
			module = require(normalizedPath);
		} catch (e) {
			return logger.error(`ModuleHandler.loadModule(): error occured while trying to load module folder: ${e}`);
		}
		logger.verbose(`ModuleHandler.loadModule(): successfully acquired module ${moduleName}`);
		this.modules.set(moduleName, module);
		logger.verbose(`ModuleHandler.loadModule(): trying to initialize ${moduleName}`);
		module.init(this.client);
		logger.verbose(`ModuleHandler.loadModule(): succcessfully initialized module ${moduleName}`);
	}

}

module.exports = ModuleHandler;